(() => {
  const API_URL = 'https://deeper-api.vinny-helloworld.workers.dev';
  const mount = document.getElementById('clerk-auth-mount');
  const status = document.getElementById('auth-status');
  const modal = document.getElementById('login-modal');
  let clerk = null;
  let currentView = 'sign-in';
  let mountedView = null;
  let saveTimer = null;
  let pendingState = null;

  function setStatus(message, kind = '') {
    status.textContent = message;
    status.dataset.kind = kind;
    status.hidden = !message;
  }

  function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Não foi possível carregar ${src}`));
      document.head.appendChild(script);
    });
  }

  function frontendApiFromKey(key) {
    const encoded = key.split('_').slice(2).join('_');
    return atob(encoded).replace(/\$$/, '');
  }

  function appearance() {
    return {
      variables: {
        colorPrimary: '#143b38',
        colorText: '#17322f',
        colorTextSecondary: '#64736f',
        colorBackground: 'transparent',
        colorInputBackground: '#ffffff',
        colorInputText: '#17322f',
        borderRadius: '6px',
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      elements: {
        rootBox: { width: '100%' },
        cardBox: { width: '100%', boxShadow: 'none' },
        card: { width: '100%', padding: '0', boxShadow: 'none', background: 'transparent' },
        header: { display: 'none' },
        footer: { background: 'transparent', padding: '12px 0 0' },
        footerAction: { display: 'none' },
        socialButtonsBlockButton: { borderColor: '#d9dfdc' },
        formButtonPrimary: { backgroundColor: '#143b38' }
      }
    };
  }

  function updateModalCopy(view) {
    const signingUp = view === 'sign-up';
    document.getElementById('login-title').textContent = signingUp ? 'Comece sua jornada.' : 'Continue sua jornada.';
    document.getElementById('login-description').textContent = signingUp
      ? 'Crie sua conta com Google ou e-mail. Seus dados serão somente seus.'
      : 'Entre com Google ou e-mail para acessar sua jornada.';
    document.querySelectorAll('[data-auth-view]').forEach((button) => {
      const active = button.dataset.authView === view;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  function mountView(view) {
    currentView = view === 'sign-up' ? 'sign-up' : 'sign-in';
    updateModalCopy(currentView);
    if (!clerk || !mount) return;
    if (mountedView === 'sign-in') clerk.unmountSignIn(mount);
    if (mountedView === 'sign-up') clerk.unmountSignUp(mount);
    mountedView = null;
    if (location.hash) history.replaceState(null, '', `${location.pathname}${location.search}`);
    const redirectUrl = `${location.origin}${location.pathname}`;
    const options = {
      appearance: appearance(),
      routing: 'virtual',
      forceRedirectUrl: redirectUrl
    };
    if (currentView === 'sign-up') clerk.mountSignUp(mount, options);
    else clerk.mountSignIn(mount, options);
    mountedView = currentView;
    setStatus('');
  }

  async function authenticatedRequest(path, options = {}) {
    if (!clerk?.session) throw new Error('Sessão indisponível.');
    const token = await clerk.session.getToken();
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`Falha na sincronização (${response.status}).`);
    return response.json();
  }

  async function initialize() {
    try {
      const configResponse = await fetch(`${API_URL}/config`, { cache: 'no-store' });
      if (!configResponse.ok) throw new Error('Configuração de acesso indisponível.');
      const config = await configResponse.json();
      const publishableKey = config.clerkPublishableKey;
      const frontendApi = frontendApiFromKey(publishableKey);
      await loadScript(`https://${frontendApi}/npm/@clerk/ui@1/dist/ui.browser.js`, { crossorigin: 'anonymous' });
      await loadScript(`https://${frontendApi}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`, {
        crossorigin: 'anonymous',
        'data-clerk-publishable-key': publishableKey
      });
      const { ptBR } = await import('https://cdn.jsdelivr.net/npm/@clerk/localizations@4.16.0/dist/pt-BR.mjs');
      ptBR.formFieldInputPlaceholder__signUpPassword = 'Crie uma senha segura';
      clerk = window.Clerk;
      await clerk.load({ localization: ptBR, ui: { ClerkUI: window.__internal_ClerkUICtor } });
      clerk.addListener(({ user, session }) => {
        window.dispatchEvent(new CustomEvent('deeper-auth-change', { detail: { user, session } }));
      });
      if (!modal.hidden) mountView(currentView);
      setStatus('');
      window.dispatchEvent(new CustomEvent('deeper-auth-ready', {
        detail: { user: clerk.user, session: clerk.session }
      }));
    } catch (error) {
      console.error(error);
      setStatus('Não foi possível conectar ao acesso seguro. Verifique sua internet e tente novamente.', 'error');
    }
  }

  window.deeperAuth = {
    open(view = 'sign-in') {
      modal.hidden = false;
      mountView(view);
    },
    close() {
      modal.hidden = true;
      if (location.hash) history.replaceState(null, '', `${location.pathname}${location.search}`);
    },
    switchView(view) {
      mountView(view);
    },
    async signOut() {
      clearTimeout(saveTimer);
      pendingState = null;
      if (clerk) await clerk.signOut();
    },
    async loadState() {
      return authenticatedRequest('/state');
    },
    async saveState(nextState) {
      pendingState = nextState;
      return authenticatedRequest('/state', { method: 'PUT', body: JSON.stringify({ state: nextState }) });
    },
    scheduleStateSave(nextState) {
      const ownerId = clerk?.user?.id;
      if (!ownerId) return;
      pendingState = { ownerId, state: structuredClone(nextState) };
      clearTimeout(saveTimer);
      saveTimer = setTimeout(async () => {
        const queued = pendingState;
        pendingState = null;
        if (!queued || clerk?.user?.id !== queued.ownerId) return;
        try {
          await this.saveState(queued.state);
        } catch (error) {
          console.error(error);
          window.dispatchEvent(new CustomEvent('deeper-sync-error'));
        }
      }, 700);
    }
  };

  initialize();
})();
