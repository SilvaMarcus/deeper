const canonicalBookCodes = [
  'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA','1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL','MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH','PHP','COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB','JAS','1PE','2PE','1JN','2JN','3JN','JUD','REV'
];

const bibleBooks = [
  ['Gênesis',50,'AT','Lei'],['Êxodo',40,'AT','Lei'],['Levítico',27,'AT','Lei'],['Números',36,'AT','Lei'],['Deuteronômio',34,'AT','Lei'],
  ['Josué',24,'AT','História'],['Juízes',21,'AT','História'],['Rute',4,'AT','História'],['1 Samuel',31,'AT','Reis'],['2 Samuel',24,'AT','Reis'],['1 Reis',22,'AT','Reis'],['2 Reis',25,'AT','Reis'],['1 Crônicas',29,'AT','Reis'],['2 Crônicas',36,'AT','Reis'],['Esdras',10,'AT','História'],['Neemias',13,'AT','História'],['Ester',10,'AT','História'],
  ['Jó',42,'AT','Poéticos'],['Salmos',150,'AT','Poéticos'],['Provérbios',31,'AT','Poéticos'],['Eclesiastes',12,'AT','Poéticos'],['Cânticos',8,'AT','Poéticos'],
  ['Isaías',66,'AT','Profetas'],['Jeremias',52,'AT','Profetas'],['Lamentações',5,'AT','Profetas'],['Ezequiel',48,'AT','Profetas'],['Daniel',12,'AT','Profetas'],['Oseias',14,'AT','Profetas'],['Joel',3,'AT','Profetas'],['Amós',9,'AT','Profetas'],['Obadias',1,'AT','Profetas'],['Jonas',4,'AT','Profetas'],['Miqueias',7,'AT','Profetas'],['Naum',3,'AT','Profetas'],['Habacuque',3,'AT','Profetas'],['Sofonias',3,'AT','Profetas'],['Ageu',2,'AT','Profetas'],['Zacarias',14,'AT','Profetas'],['Malaquias',4,'AT','Profetas'],
  ['Mateus',28,'NT','Evangelhos'],['Marcos',16,'NT','Evangelhos'],['Lucas',24,'NT','Evangelhos'],['João',21,'NT','Evangelhos'],['Atos',28,'NT','Igreja'],
  ['Romanos',16,'NT','Cartas'],['1 Coríntios',16,'NT','Cartas'],['2 Coríntios',13,'NT','Cartas'],['Gálatas',6,'NT','Cartas'],['Efésios',6,'NT','Cartas'],['Filipenses',4,'NT','Cartas'],['Colossenses',4,'NT','Cartas'],['1 Tessalonicenses',5,'NT','Cartas'],['2 Tessalonicenses',3,'NT','Cartas'],['1 Timóteo',6,'NT','Cartas'],['2 Timóteo',4,'NT','Cartas'],['Tito',3,'NT','Cartas'],['Filemom',1,'NT','Cartas'],['Hebreus',13,'NT','Cartas'],['Tiago',5,'NT','Cartas'],['1 Pedro',5,'NT','Cartas'],['2 Pedro',3,'NT','Cartas'],['1 João',5,'NT','Cartas'],['2 João',1,'NT','Cartas'],['3 João',1,'NT','Cartas'],['Judas',1,'NT','Cartas'],['Apocalipse',22,'NT','Apocalipse']
].map(([name, chapters, testament, genre], index) => ({ name, chapters, testament, genre, code: canonicalBookCodes[index] }));

const chronologicalBookOrder = [
  'Gênesis','Jó','Êxodo','Levítico','Números','Deuteronômio','Josué','Juízes','Rute','1 Samuel','2 Samuel','1 Crônicas','Salmos','1 Reis','Provérbios','Eclesiastes','Cânticos','2 Crônicas','Isaías','Oseias','Joel','Amós','Jonas','Miqueias','Naum','2 Reis','Sofonias','Habacuque','Jeremias','Lamentações','Ezequiel','Daniel','Obadias','Esdras','Ageu','Zacarias','Ester','Neemias','Malaquias','Mateus','Marcos','Lucas','João','Atos','Tiago','Gálatas','1 Tessalonicenses','2 Tessalonicenses','1 Coríntios','2 Coríntios','Romanos','Colossenses','Filemom','Efésios','Filipenses','1 Timóteo','Tito','1 Pedro','Hebreus','2 Timóteo','2 Pedro','Judas','1 João','2 João','3 João','Apocalipse'
];

const bibleBookGroups = [
  { id: 'pentateuch', label: 'Pentateuco', books: ['Gênesis','Êxodo','Levítico','Números','Deuteronômio'] },
  { id: 'israel-history', label: 'História de Israel', books: ['Josué','Juízes','Rute','1 Samuel','2 Samuel','1 Reis','2 Reis','1 Crônicas','2 Crônicas','Esdras','Neemias','Ester'] },
  { id: 'poetry', label: 'Poéticos e sabedoria', books: ['Jó','Salmos','Provérbios','Eclesiastes','Cânticos'] },
  { id: 'major-prophets', label: 'Profetas maiores', books: ['Isaías','Jeremias','Lamentações','Ezequiel','Daniel'] },
  { id: 'minor-prophets', label: 'Profetas menores', books: ['Oseias','Joel','Amós','Obadias','Jonas','Miqueias','Naum','Habacuque','Sofonias','Ageu','Zacarias','Malaquias'] },
  { id: 'gospels', label: 'Evangelhos', books: ['Mateus','Marcos','Lucas','João'] },
  { id: 'early-church', label: 'Igreja primitiva', books: ['Atos'] },
  { id: 'pauline-letters', label: 'Cartas de Paulo', books: ['Romanos','1 Coríntios','2 Coríntios','Gálatas','Efésios','Filipenses','Colossenses','1 Tessalonicenses','2 Tessalonicenses','1 Timóteo','2 Timóteo','Tito','Filemom'] },
  { id: 'general-letters', label: 'Cartas gerais', books: ['Hebreus','Tiago','1 Pedro','2 Pedro','1 João','2 João','3 João','Judas'] },
  { id: 'revelation', label: 'Apocalipse', books: ['Apocalipse'] }
];

let bibleStoryDefinitions = [];
let bibleStoryCatalogReady = false;
let chronologicalReadingDays = [];
let chronologicalPlanReady = false;

const defaultState = {
  theme: localStorage.getItem('sdr-theme') || 'light',
  page: 'home',
  readerTextScale: 1,
  highlights: {},
  comments: {},
  favorites: [],
  selectedVerse: null,
  plans: [],
  plan: {
    id: '',
    title: '',
    method: 'canonical',
    scope: 'all',
    duration: '6',
    version: '',
    checklist: 'daily',
    bookCheckMode: 'book',
    days: []
  },
  reader: { versionId: '', bookCode: 'GEN', chapter: 1, verse: '' },
  planReading: null,
  studyTab: 'courses',
  articleProgress: {},
};

let activeAccount = null;
let authTransition = 0;
let state = hydrate();
let selectedPlanDay = null;
let planFormOpen = false;
let planManageMode = false;
let expandedPlanId = null;
let searchPanel = null;
let bibleCatalog = [];
let bibleLibraryOpen = false;
let activeChapter = null;
let commentComposerOpen = false;
let commentComposerVerse = null;
let readerSizeMenuOpen = false;
let activeArticleId = null;
let installedBibleIds = JSON.parse(localStorage.getItem('sdr-installed-bibles') || '[]');

const studyArticles = [
  {
    id: 'angeologia', title: 'Angeologia: o que a Bíblia realmente ensina sobre os anjos',
    summary: 'Quem são, o que fazem e por que nunca devem ocupar o lugar de Cristo.', image: 'assets/articles/angeologia.png', readTime: '9 min',
    intro: 'Anjos despertam curiosidade — e justamente por isso acumulam ideias que a Bíblia nunca ensinou. Um estudo cristão saudável começa tirando o foco das especulações e voltando ao texto: anjos são criaturas de Deus, servos dele e participantes discretos da história da redenção.',
    sections: [
      ['Criados, não divinos', 'A Bíblia apresenta os anjos como parte da criação de Deus. Colossenses 1:16 afirma que todas as coisas, visíveis e invisíveis, foram criadas por meio de Cristo e para Cristo. Eles são poderosos, mas não oniscientes, onipresentes ou dignos de adoração. Quando João tenta se prostrar diante de um anjo, recebe uma correção imediata: “Adore a Deus” (Apocalipse 22:8–9).'],
      ['Mensageiros e servos', 'A palavra “anjo” descreve um mensageiro. Gabriel anuncia nascimentos ligados ao plano de Deus (Lucas 1), anjos servem a Jesus após a tentação (Mateus 4:11) e fortalecem os servos de Deus em momentos específicos. Hebreus 1:14 os chama de espíritos ministradores enviados a favor dos que herdarão a salvação. A iniciativa, porém, é sempre de Deus.'],
      ['Há diferentes seres espirituais?', 'A Escritura menciona querubins, serafins, arcanjo e hostes celestiais. Nem sempre explica hierarquias ou aparências com os detalhes que gostaríamos. O caminho responsável é afirmar o que o texto afirma e parar onde ele para. Descrições proféticas, como as de Isaías 6 e Ezequiel 1, carregam linguagem de visão e destacam sobretudo a santidade e a glória de Deus.'],
      ['Anjos caídos e discernimento', 'A Bíblia também fala de seres espirituais em rebelião e identifica o diabo como enganador. Isso não autoriza medo constante nem obsessão. O Novo Testamento direciona o cristão à sobriedade, à oração, à verdade e à resistência firme na fé (Efésios 6:10–18; Tiago 4:7). Cristo triunfou sobre os poderes (Colossenses 2:15).'],
      ['O centro continua sendo Cristo', 'Uma boa angeologia termina com os olhos em Jesus. Hebreus 1 insiste que o Filho é superior aos anjos. Eles servem; Cristo reina. Eles anunciam; Cristo salva. Podemos agradecer a Deus por sua providência sem tentar contatar anjos, dar nomes que a Bíblia não dá ou construir doutrinas sobre experiências pessoais.']
    ], takeaway: 'Curiosidade espiritual precisa caminhar com humildade bíblica: receba o que Deus revelou, rejeite a especulação e mantenha Cristo no centro.', references: 'Salmo 103:20–21 · Colossenses 1:16 · Hebreus 1 · Lucas 1 · Apocalipse 22:8–9'
  },
  {
    id: 'cosmovisao-crista', title: 'Cosmovisão cristã: enxergando toda a vida à luz da Bíblia',
    summary: 'Uma lente bíblica para pensar trabalho, cultura, sofrimento, escolhas e esperança.', image: 'assets/articles/cosmovisao-crista.png', readTime: '8 min',
    intro: 'Cosmovisão é a história básica pela qual interpretamos o mundo. Mesmo sem perceber, todos respondemos a perguntas como: de onde viemos, o que deu errado, o que pode nos restaurar e para onde caminhamos? A fé cristã oferece respostas conectadas em uma grande narrativa: criação, queda, redenção e restauração.',
    sections: [
      ['Criação: o mundo tem sentido', 'Gênesis começa com Deus, não conosco. O universo é intencional, bom e dependente do Criador. Pessoas possuem dignidade porque foram feitas à imagem de Deus (Gênesis 1:26–28). Isso transforma a maneira como tratamos o corpo, a natureza, o trabalho, a arte e o próximo: nada disso é espiritualmente descartável.'],
      ['Queda: o problema também passa pelo coração', 'O pecado rompe nossa comunhão com Deus e desorganiza desejos, relações e estruturas. A visão cristã não é ingênua sobre o mal, mas também não reduz pessoas aos seus piores atos. Romanos 3 mostra uma humanidade universalmente necessitada da graça. O problema é mais profundo que falta de informação; precisamos de reconciliação.'],
      ['Redenção: Jesus é o centro', 'O evangelho não é uma técnica de autoaperfeiçoamento. Em Jesus, Deus entra na história, assume nossa humanidade, morre por nossos pecados e ressuscita. A redenção é recebida pela graça mediante a fé (Efésios 2:8–10) e começa a renovar mente, afetos e práticas. Não fugimos do mundo: aprendemos a servi-lo sem nos moldar aos seus ídolos.'],
      ['Restauração: a esperança tem futuro', 'A história não termina em almas escapando da criação, mas em novos céus e nova terra, com Deus habitando com seu povo (Apocalipse 21). Essa esperança impede tanto o desespero quanto a pretensão de construir o paraíso por nossas forças. Trabalhamos pelo bem agora porque sabemos quem concluirá a obra.'],
      ['Como praticar essa lente', 'Antes de aceitar uma ideia, pergunte: que visão de pessoa, problema e salvação ela carrega? Compare-a com o ensino bíblico, ouça cristãos maduros e observe seus frutos. Uma cosmovisão cristã não significa ter resposta rápida para tudo; significa aprender a pensar, amar e agir sob o senhorio de Jesus.']
    ], takeaway: 'A Bíblia não oferece apenas respostas religiosas; ela reorganiza a história inteira que contamos sobre realidade, identidade, mal, esperança e propósito.', references: 'Gênesis 1–3 · Romanos 3 e 12:1–2 · Efésios 2:8–10 · Colossenses 1:15–20 · Apocalipse 21'
  },
  {
    id: 'defender-a-fe', title: 'Como defender minha fé sem perder a graça?',
    summary: 'Convicção, boas perguntas e respeito para conversas que apontam a Cristo.', image: 'assets/articles/defender-a-fe.png', readTime: '10 min',
    intro: 'Defender a fé não é vencer pessoas. É apresentar razões para a esperança cristã de modo verdadeiro, compreensível e amoroso. Pedro une preparo e caráter: devemos estar prontos para responder, “com mansidão e temor” (1 Pedro 3:15–16). O tom faz parte da resposta.',
    sections: [
      ['Conheça o evangelho que você anuncia', 'Antes de decorar argumentos, saiba explicar a mensagem central: Deus é santo e Criador; nós pecamos; Jesus morreu e ressuscitou; Deus oferece perdão e nova vida a quem se arrepende e crê. A apologética serve essa boa notícia. Se a cruz e a ressurreição desaparecem, talvez estejamos defendendo apenas costumes.'],
      ['Ouça antes de responder', 'A mesma objeção pode nascer de dúvidas intelectuais, experiências dolorosas ou decepções com cristãos. Perguntas como “o que você quer dizer?” e “o que o levou a pensar assim?” evitam respostas prontas para questões que ninguém fez. Tiago 1:19 nos chama a ser prontos para ouvir e tardios para falar.'],
      ['Dê razões honestas', 'A fé bíblica não teme investigação. A ressurreição é apresentada como acontecimento público e testemunhado (1 Coríntios 15:3–8). A ordem e inteligibilidade da criação, a realidade moral, a singularidade de Jesus e a coerência da narrativa bíblica formam um caso cumulativo. Nenhum argumento manipula alguém até a fé; ele pode remover obstáculos e mostrar que confiar em Cristo é razoável.'],
      ['Saiba dizer “não sei”', 'Humildade aumenta, não diminui, a credibilidade. Você pode dizer: “Essa é uma boa pergunta; quero estudar antes de responder”. Diferencie mistério de contradição e convicção central de opinião secundária. Atos 17 mostra Paulo compreendendo seu público e construindo uma ponte sem diluir sua mensagem.'],
      ['Cuide da vida que acompanha as palavras', 'Uma resposta impecável perde força quando vem com arrogância. Jesus unia graça e verdade. Peça perdão quando cristãos agiram mal, não caricature o outro e encerre uma conversa quando ela deixou de ser produtiva. Nosso objetivo é fidelidade e amor; quem convence o coração é o Espírito Santo.']
    ], takeaway: 'Prepare a mente, abrande o tom e trate a pessoa à sua frente como alguém feito à imagem de Deus — não como um argumento a ser derrotado.', references: '1 Pedro 3:15–16 · Tiago 1:19 · Atos 17:16–34 · 1 Coríntios 15:3–8 · Colossenses 4:5–6'
  },
  {
    id: 'fio-vermelho', title: 'O fio da redenção: como toda a Bíblia aponta para Cristo',
    summary: 'Da criação à nova criação, uma só história de promessa, aliança e resgate.', image: 'assets/articles/fio-vermelho.png', readTime: '9 min',
    intro: 'A Bíblia reúne muitos autores, épocas e gêneros, mas não é uma coleção desconectada. Ela conta a história do Deus que cria, busca pecadores, firma alianças, salva e conduz todas as coisas a Cristo. Perceber esse fio protege a leitura de moralismos e revela a beleza do todo.',
    sections: [
      ['Uma promessa no meio da ruptura', 'Após a queda, Deus anuncia que o descendente da mulher vencerá a serpente (Gênesis 3:15). A promessa ainda é semente, mas estabelece o movimento: o mal não terá a última palavra. Com Abraão, Deus promete bênção para todas as famílias da terra (Gênesis 12:1–3).'],
      ['Êxodo, cordeiro e presença', 'Deus liberta Israel da escravidão, e o sangue do cordeiro pascal marca a casa dos que confiam em sua palavra. A libertação conduz à aliança e ao tabernáculo: Deus deseja habitar com seu povo. O episódio é real na história de Israel e também prepara categorias que o Novo Testamento aplica a Jesus, nosso Cordeiro pascal (1 Coríntios 5:7).'],
      ['Rei, profeta e servo', 'A aliança com Davi aponta para um rei cujo reino permanecerá. Os profetas denunciam o pecado e anunciam nova aliança, novo coração e o Servo que levaria as iniquidades de muitos (Jeremias 31; Ezequiel 36; Isaías 53). As expectativas se acumulam sem se resolver plenamente no Antigo Testamento.'],
      ['Jesus cumpre sem simplificar', 'Jesus anuncia que as Escrituras testemunham dele (Lucas 24:27; João 5:39). Ele é o verdadeiro templo, o Filho de Davi, o Cordeiro e o mediador da nova aliança. Cumprimento não significa que cada detalhe seja um código secreto; significa que os grandes temas e promessas encontram nele seu centro e clímax.'],
      ['A história continua até a restauração', 'A igreja não substitui a esperança por uma abstração. Ela anuncia o evangelho entre as nações enquanto aguarda a volta de Cristo. Apocalipse 21–22 retoma imagens do Éden: rio, árvore da vida e presença de Deus. O final responde ao começo — agora sem morte, maldição ou separação.']
    ], takeaway: 'Leia cada passagem em seu contexto e, depois, pergunte como ela participa da grande história que chega a Jesus e à nova criação.', references: 'Gênesis 3:15 e 12:1–3 · Êxodo 12 · 2 Samuel 7 · Isaías 53 · Lucas 24:27 · Apocalipse 21–22'
  },
  {
    id: 'imagem-de-deus', title: 'Imagem de Deus: por que toda pessoa tem dignidade',
    summary: 'Uma verdade bíblica que transforma identidade, cuidado e vida em comunidade.', image: 'assets/articles/imagem-de-deus.png', readTime: '8 min',
    intro: 'Antes de falar de desempenho, origem, idade ou capacidade, a Bíblia faz uma declaração radical: seres humanos foram criados à imagem e semelhança de Deus. Essa dignidade não é conquistada. Ela é recebida e continua relevante mesmo em um mundo ferido pelo pecado.',
    sections: [
      ['Representar sem ser divino', 'Em Gênesis 1:26–28, homem e mulher recebem juntos a vocação de refletir o governo bom de Deus sobre a criação. Ser imagem não significa possuir uma aparência divina, mas viver como representante responsável do Criador. Toda pessoa compartilha esse valor; nenhuma etnia, classe ou sexo carrega mais imagem que outra.'],
      ['A queda distorce, não apaga', 'O pecado danifica profundamente nossa maneira de amar, trabalhar e exercer poder, mas Gênesis 9:6 e Tiago 3:9 ainda tratam seres humanos caídos como portadores da imagem. Por isso violência, desprezo e palavras que desumanizam são tão graves. A dignidade permanece mesmo quando a conduta precisa ser confrontada.'],
      ['Cristo, a imagem perfeita', 'O Novo Testamento chama Jesus de imagem do Deus invisível (Colossenses 1:15). Nele vemos a humanidade como deveria ser: obediente ao Pai, cheia de graça, verdade e amor sacrificial. A salvação inclui sermos transformados à sua imagem (Romanos 8:29), não apagando nossa humanidade, mas restaurando-a.'],
      ['Dignidade vira prática', 'Essa doutrina muda como recebemos crianças, idosos, pessoas com deficiência, estrangeiros, pobres e até adversários. Ela sustenta cuidado com a vida, justiça sem vingança, trabalho digno e comunidade onde vulnerabilidade não diminui valor. Amar o próximo não é sentimentalismo; é responder ao selo do Criador nele.'],
      ['Identidade sem orgulho ou vergonha', 'Você não precisa provar que merece existir, nem transformar talentos em medida de valor. Ao mesmo tempo, ser imagem de Deus não alimenta superioridade: é uma vocação recebida. Em Cristo, identidade e missão se encontram — somos amados pela graça e chamados a refletir seu caráter no cotidiano.']
    ], takeaway: 'Olhar alguém biblicamente é enxergar mais do que utilidade, concordância ou aparência: é reconhecer uma vida criada por Deus e chamada à restauração em Cristo.', references: 'Gênesis 1:26–28 e 9:6 · Salmo 8 · Tiago 3:9–10 · Colossenses 1:15 · Romanos 8:29'
  },
  {
    id: 'reino-ja-ainda-nao', title: 'O Reino de Deus: já presente, ainda não completo',
    summary: 'Como viver entre a vitória inaugurada por Jesus e a restauração que ainda esperamos.', image: 'assets/articles/reino-ja-ainda-nao.png', readTime: '9 min',
    intro: '“Reino de Deus” é uma das expressões centrais da pregação de Jesus. Não descreve primeiro um lugar, mas o governo ativo de Deus. Em Jesus, esse Reino chegou de modo decisivo; ainda assim, continuamos vendo sofrimento, pecado e morte. A Bíblia nos ensina a viver nessa tensão sem cinismo nem triunfalismo.',
    sections: [
      ['O Rei chegou', 'Jesus inicia seu ministério anunciando: “O tempo está cumprido, e o Reino de Deus está próximo” (Marcos 1:15). Suas curas, libertações, perdão e acolhimento são sinais de que o governo de Deus invade o território do mal. Na cruz e ressurreição, o Rei vence pelo amor sacrificial, não pela lógica da dominação.'],
      ['O Reino já está entre nós', 'Onde pessoas se submetem a Cristo, o futuro começa a aparecer no presente: inimigos se reconciliam, o vulnerável é servido, o pecado perde domínio e uma nova família é formada. A igreja não é o Reino em sua totalidade, mas é chamada a ser sinal e instrumento dele, anunciando e encarnando as boas-novas.'],
      ['O Reino ainda virá', 'Paulo reconhece que a criação ainda geme (Romanos 8:18–25). Cristãos adoecem, enfrentam injustiça e morrem. Não devemos prometer uma vida sem sofrimento agora. Oramos por cura e trabalhamos por justiça, mas aguardamos a volta de Cristo, a ressurreição dos mortos e a renovação de todas as coisas.'],
      ['Duas tentações a evitar', 'O “ainda não” nos impede de declarar vitória total antes da hora; o “já” nos impede de cruzar os braços. Triunfalismo culpa quem sofre e trata toda conquista como prova de fé. Pessimismo esquece que Jesus reina e que nenhuma obra feita nele é inútil. Esperança bíblica é paciente e ativa.'],
      ['Uma vida em forma de sinal', 'Vivemos o Reino quando perdoamos, falamos a verdade, cuidamos do pobre, buscamos justiça, compartilhamos a mesa e permanecemos fiéis no sofrimento. São sementes, não o resultado final. Podemos agir sem ansiedade messiânica porque a conclusão pertence ao Rei. Nossa oração continua: “Venha o teu Reino”.']
    ], takeaway: 'O Reino já chegou em Jesus e um dia será plenamente visível. Até lá, a igreja vive como amostra humilde, corajosa e esperançosa do futuro de Deus.', references: 'Marcos 1:14–15 · Mateus 6:9–10 e 12:28 · Lucas 17:20–21 · Romanos 8:18–25 · 1 Coríntios 15:20–28'
  }
];

async function initializeBibleStories() {
  try {
    const response = await fetch('data/bible-stories.json?v=1');
    if (!response.ok) throw new Error('Catálogo de histórias indisponível');
    const catalog = await response.json();
    bibleStoryDefinitions = Array.isArray(catalog.stories) ? catalog.stories : [];
    bibleStoryCatalogReady = bibleStoryDefinitions.length > 0;
    let changed = false;
    state.plans.forEach(plan => {
      if (plan.checklist === 'story' && !(plan.days || []).some(day => Array.isArray(day.storyIds))) {
        plan.days = buildStoryPlanDays(plan.scope, plan.duration, plan.method);
        plan.completedItemIds = (plan.completedItemIds || []).filter(id => bibleStoryDefinitions.some(story => story.id === id));
        changed = true;
      }
    });
    if (changed) persist();
    if (!document.getElementById('app').hidden && ['home','plans'].includes(state.page)) renderPage(state.page);
  } catch (error) {
    console.error(error);
    toast('Não foi possível carregar as histórias bíblicas.');
  }
}

async function initializeChronologicalPlan() {
  try {
    const response = await fetch('data/chronological-plan.json?v=1');
    if (!response.ok) throw new Error('Plano cronológico indisponível');
    const catalog = await response.json();
    chronologicalReadingDays = Array.isArray(catalog.days) ? catalog.days : [];
    chronologicalPlanReady = chronologicalReadingDays.length === 365;
    if (!document.getElementById('app').hidden && ['home','plans'].includes(state.page)) renderPage(state.page);
  } catch (error) {
    console.error(error);
    toast('Não foi possível carregar a ordem cronológica.');
  }
}

function accountStorageKey(userId) {
  return `deeper-user-state:${userId}`;
}

function hydrate(source) {
  try {
    if (localStorage.getItem('sdr-data-version') !== '4') {
      localStorage.removeItem('sdr-state');
      localStorage.removeItem('sdr-installed-bibles');
      localStorage.setItem('sdr-data-version', '4');
    }
    const stored = source === undefined
      ? (activeAccount ? JSON.parse(localStorage.getItem(accountStorageKey(activeAccount.id))) : null)
      : source;
    if (!stored) return structuredClone(defaultState);
    const legacyPlan = { ...defaultState.plan, ...(stored.plan || {}) };
    legacyPlan.duration = String(stored.plan?.duration || stored.plan?.months || defaultState.plan.duration);
    legacyPlan.checklist = stored.plan?.checklist === 'chapter' || stored.plan?.checklist === 'block' ? 'daily' : (stored.plan?.checklist || 'daily');
    legacyPlan.days = [];
    const migratedPlans = Array.isArray(stored.plans) ? stored.plans : (stored.plan?.days?.length ? [{
      ...stored.plan,
      id: `plan-${Date.now()}`,
      title: 'Meu plano de leitura',
      duration: String(stored.plan.months || 6),
      checklist: 'daily',
      bookCheckMode: 'book',
      completedItemIds: []
    }] : []);
    return {
      ...defaultState,
      ...stored,
      readerTextScale: Number.isFinite(Number(stored.readerTextScale))
        ? Math.max(.7, Math.min(1.6, Number(stored.readerTextScale)))
        : stored.readerLargeText ? 1.25 : 1,
      plans: migratedPlans.map(plan => ({
        ...structuredClone(defaultState.plan),
        ...plan,
        id: plan.id || `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        duration: String(plan.duration || plan.months || defaultState.plan.duration),
        checklist: plan.checklist === 'chapter' || plan.checklist === 'block' ? 'daily' : (plan.checklist || 'daily'),
        completedItemIds: Array.isArray(plan.completedItemIds) ? plan.completedItemIds : [],
        completedChapterIds: Array.isArray(plan.completedChapterIds) ? plan.completedChapterIds : []
      })),
      plan: legacyPlan,
      reader: { ...defaultState.reader, ...(stored.reader || {}) },
      planReading: stored.planReading || null
    };
  } catch { return structuredClone(defaultState); }
}

function persist() {
  if (!activeAccount) return;
  localStorage.setItem(accountStorageKey(activeAccount.id), JSON.stringify(state));
  window.deeperAuth?.scheduleStateSave(state);
}

function openBibleDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('sdr-bibles', 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (db.objectStoreNames.contains('chapters')) db.deleteObjectStore('chapters');
      db.createObjectStore('chapters', { keyPath: 'key' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function initializeBibleLibrary() {
  try {
    const response = await fetch('data/bibles/catalog.json?v=2', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Catálogo indisponível');
    bibleCatalog = (await response.json()).versions;
    const onlineBooks = bibleCatalog.find(version => version.id === 'porbr2018').books;
    bibleCatalog.push(...[
      ['nvi', 'NVI', 'Nova Versão Internacional', 'Biblica'],
      ['nvt', 'NVT', 'Nova Versão Transformadora', 'Mundo Cristão'],
      ['acf', 'ACF', 'Almeida Corrigida Fiel', 'Sociedade Bíblica Trinitariana do Brasil']
    ].map(([id, abbreviation, name, publisher]) => ({
      id, abbreviation, name, online: true, language: 'pt-BR', completeness: 'Bíblia completa', bookCount: 66,
      books: onlineBooks, license: 'Consulta online · direitos reservados',
      sourceUrl: 'https://abibliadigital.api.br/', licenseUrl: 'https://abibliadigital.api.br/',
      attribution: `${name}. Direitos da tradução: ${publisher}. Consulta via ABíbliaDigital.`,
      description: 'Leitura por capítulo pela internet. Não é baixada para uso offline.'
    })));
    installedBibleIds = installedBibleIds.filter(id => bibleCatalog.some(version => version.id === id));
    localStorage.setItem('sdr-installed-bibles', JSON.stringify(installedBibleIds));
    if (!state.reader.versionId && installedBibleIds.length) state.reader.versionId = installedBibleIds[0];
    if (state.reader.versionId && !bibleCatalog.some(version => version.id === state.reader.versionId && bibleAvailable(version))) state.reader.versionId = '';
    persist();
    const prepared = JSON.parse(localStorage.getItem('deeper-prepared-selection-v1') || '[]');
    for (const version of bibleCatalog.filter(item => item.recommended)) {
      if (prepared.includes(version.id)) continue;
      if (installedBibleIds.includes(version.id) || await installBibleVersion(version.id, null, { background: true })) {
        prepared.push(version.id);
        localStorage.setItem('deeper-prepared-selection-v1', JSON.stringify(prepared));
      }
    }
    if (!document.getElementById('app').hidden && ['reader','plan-reader'].includes(state.page)) renderPage(state.page);
  } catch (error) {
    console.error(error);
    toast('Não foi possível carregar o catálogo de Bíblias.');
  }
}

function bibleAvailable(version) {
  return version.online || installedBibleIds.includes(version.id);
}

function chapterKey(versionId, bookCode, chapter) {
  return `${versionId}:${bookCode}:${chapter}`;
}

function currentVerseKey(number) {
  return `${state.reader.versionId}:${state.reader.bookCode}:${state.reader.chapter}:${number}`;
}

async function readOfflineChapter() {
  if (!state.reader.versionId) return null;
  const { versionId, bookCode, chapter } = state.reader;
  if (bibleCatalog.find(version => version.id === versionId)?.online) {
    if (!navigator.onLine) throw new Error('Esta versão exige internet. Selecione uma das Bíblias offline para continuar.');
    const response = await fetch(`/api/bible/${versionId}/${bookCode}/${chapter}`, {cache:'no-store', signal:AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error('A fonte online está indisponível. Tente novamente ou selecione uma Bíblia offline.');
    return response.json();
  }
  const db = await openBibleDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('chapters').objectStore('chapters').get(chapterKey(versionId, bookCode, chapter));
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function sha256Hex(buffer) {
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function installBibleVersion(versionId, button, { background = false } = {}) {
  const version = bibleCatalog.find(item => item.id === versionId);
  if (!version) return;
  const originalLabel = button?.textContent;
  if (button) { button.disabled = true; button.textContent = 'Baixando...'; }
  try {
    const response = await fetch(`${version.packageFile}?hash=${version.sha256.slice(0, 12)}`);
    if (!response.ok) throw new Error('Falha no download');
    const compressed = await response.arrayBuffer();
    if (await sha256Hex(compressed) !== version.sha256) throw new Error('Pacote corrompido');
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
    const biblePackage = JSON.parse(await new Response(stream).text());
    if (biblePackage.version.id !== versionId || biblePackage.books.length !== version.bookCount) throw new Error('Pacote incompatível');
    const db = await openBibleDatabase();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction('chapters', 'readwrite');
      const store = transaction.objectStore('chapters');
      biblePackage.chapters.forEach(chapter => store.put({
        key: chapterKey(versionId, chapter.bookCode, chapter.chapter),
        versionId,
        ...chapter
      }));
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
    if (!installedBibleIds.includes(versionId)) installedBibleIds.push(versionId);
    localStorage.setItem('sdr-installed-bibles', JSON.stringify(installedBibleIds));
    if (background) {
      if (!state.reader.versionId) state.reader = { versionId, bookCode: biblePackage.books[0].code, chapter: 1, verse: '' };
      persist();
      return true;
    }
    const planContext = planReadingContext();
    state.reader = planContext
      ? { versionId, bookCode: planContext.chapter.code, chapter: planContext.chapter.chapter, verse: '' }
      : { versionId, bookCode: biblePackage.books[0].code, chapter: 1, verse: '' };
    state.plan.version = version.name;
    bibleLibraryOpen = false;
    persist();
    renderPage(state.page === 'plan-reader' ? 'plan-reader' : 'reader');
    toast(`${version.abbreviation} instalada para leitura offline.`);
    return true;
  } catch (error) {
    console.error(error);
    toast('Não foi possível instalar esta versão.');
    if (button) { button.disabled = false; button.textContent = originalLabel; }
    return false;
  }
}

async function removeBibleVersion(versionId) {
  const version = bibleCatalog.find(item => item.id === versionId);
  if (!version) return;
  const db = await openBibleDatabase();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('chapters', 'readwrite');
    const store = transaction.objectStore('chapters');
    version.books.forEach(book => {
      for (let chapter = 1; chapter <= book.chapters; chapter++) store.delete(chapterKey(versionId, book.code, chapter));
    });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  installedBibleIds = installedBibleIds.filter(id => id !== versionId);
  localStorage.setItem('sdr-installed-bibles', JSON.stringify(installedBibleIds));
  if (state.reader.versionId === versionId) state.reader = { versionId: installedBibleIds[0] || '', bookCode: 'GEN', chapter: 1, verse: '' };
  persist();
  renderPage(state.page === 'plan-reader' ? 'plan-reader' : 'reader');
  toast(`${version.abbreviation} removida deste dispositivo.`);
}

function esc(text = '') {
  return String(text).replace(/[&<>'"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('sdr-theme', theme);
  persist();
}
setTheme(state.theme);

function openApp() {
  document.getElementById('landing').hidden = true;
  document.getElementById('marketing').hidden = true;
  document.getElementById('login-modal').hidden = true;
  document.getElementById('app').hidden = false;
  document.body.classList.add('app-open');
  renderPage(state.page || 'home');
}

function showLanding() {
  document.getElementById('landing').hidden = false;
  document.getElementById('marketing').hidden = false;
  document.getElementById('app').hidden = true;
  document.body.classList.remove('app-open');
}

function accountDetails() {
  return activeAccount || { id: '', name: 'Minha conta', email: '', initials: '--' };
}

function updateAccountChrome() {
  const account = accountDetails();
  document.querySelectorAll('[data-account-name]').forEach((element) => { element.textContent = account.name; });
  document.querySelectorAll('[data-account-email]').forEach((element) => { element.textContent = account.email; });
  document.querySelectorAll('[data-account-avatar]').forEach((element) => { element.textContent = account.initials; });
}

function profileFromClerkUser(user) {
  const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '';
  const name = user.fullName || user.firstName || email.split('@')[0] || 'Minha conta';
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'EU';
  return { id: user.id, name, email, initials };
}

async function activateAccount(user) {
  if (!user?.id) return;
  if (activeAccount?.id === user.id && !document.getElementById('app').hidden) return;
  const transition = ++authTransition;
  activeAccount = profileFromClerkUser(user);
  const localState = hydrate();
  let nextState = localState;
  let remoteAvailable = false;
  try {
    const remote = await window.deeperAuth.loadState();
    if (transition !== authTransition) return;
    remoteAvailable = true;
    if (remote?.state) nextState = hydrate(remote.state);
  } catch (error) {
    console.error(error);
  }
  if (transition !== authTransition) return;
  state = nextState;
  document.documentElement.dataset.theme = state.theme;
  localStorage.setItem('sdr-theme', state.theme);
  localStorage.setItem(accountStorageKey(activeAccount.id), JSON.stringify(state));
  updateAccountChrome();
  openApp();
  if (remoteAvailable) window.deeperAuth.scheduleStateSave(state);
  else toast('Você está usando os dados salvos neste dispositivo.');
}

function deactivateAccount() {
  authTransition += 1;
  activeAccount = null;
  state = hydrate(null);
  expandedPlanId = null;
  selectedPlanDay = null;
  planFormOpen = false;
  document.getElementById('account-menu').hidden = true;
  updateAccountChrome();
  showLanding();
}

function pageHead(kicker, title, description, actions = '') {
  return `<header class="page-head"><div><h1>${title}</h1></div>${actions ? `<div class="page-actions">${actions}</div>` : ''}</header>`;
}

function progressClass(done, total) {
  const ratio = total ? done / total : 0;
  if (ratio >= 1) return 'done';
  if (ratio > .4) return 'partial';
  return 'low';
}

function planProgressItems(plan) {
  if (plan.checklist === 'story') {
    const scheduledIds = (plan.days || []).flatMap(day => day.storyIds || []);
    const source = scheduledIds.length
      ? scheduledIds.map(id => bibleStoryDefinitions.find(story => story.id === id)).filter(Boolean)
      : bibleStoryDefinitions.filter(item => plan.scope === 'all' || item.testament === plan.scope);
    return source.map(item => ({ ...item, label: item.title, description: `${item.reference} · ${item.groupTitle}` }));
  }
  const chapters = (plan.days || []).flatMap((day, dayIndex) => (day.chapters || []).map(chapter => ({ ...chapter, dayIndex })));
  if (plan.checklist === 'daily') {
    return chapters.map(chapter => ({
      id: chapterItemId(chapter),
      label: `${chapter.book} ${chapter.chapter}`,
      description: `Dia ${chapter.dayIndex + 1}`,
      chapterIds: [chapterItemId(chapter)],
    }));
  }
  const books = chapters.map(item => item.book).filter((book, index, list) => list.indexOf(book) === index);
  if (plan.checklist === 'book' && plan.bookCheckMode === 'category') {
    return bibleBookGroups.map(group => {
      const included = group.books.filter(book => books.includes(book));
      const chapterIds = chapters.filter(chapter => included.includes(chapter.book)).map(chapterItemId);
      return { id: `group-${group.id}`, label: group.label, description: included.join(', '), chapterIds };
    }).filter(item => item.description);
  }
  if (plan.checklist === 'book') {
    return books.map(book => ({
      id: `book-${book}`,
      label: book,
      description: 'Livro completo',
      chapterIds: chapters.filter(chapter => chapter.book === book).map(chapterItemId),
    }));
  }
  return [];
}

function planProgressItemState(plan, item) {
  if (plan.checklist === 'story') {
    const complete = (plan.completedItemIds || []).includes(item.id);
    return { done: complete ? 1 : 0, total: 1, complete, partial: false };
  }
  const completed = new Set(plan.completedChapterIds || []);
  const chapterIds = item.chapterIds || [];
  const done = chapterIds.filter(id => completed.has(id)).length;
  return { done, total: chapterIds.length, complete: chapterIds.length > 0 && done === chapterIds.length, partial: done > 0 && done < chapterIds.length };
}

function planProgress(plan) {
  const items = planProgressItems(plan);
  const done = items.reduce((total, item) => total + (planProgressItemState(plan, item).complete ? 1 : 0), 0);
  return { items, done, total: items.length, percent: items.length ? Math.round(done / items.length * 100) : 0 };
}

function allPlansProgress() {
  const items = (state.plans || []).flatMap(plan => planProgress(plan).items.map(item => ({ ...item, planId: plan.id, complete: planProgressItemState(plan, item).complete })));
  const done = items.filter(item => item.complete).length;
  return { items, done, total: items.length, percent: items.length ? Math.round(done / items.length * 100) : 0 };
}

function totalPlanProgress(plan) {
  return planProgress(plan).percent;
}

function nextPlanDays(plan, count = 3) {
  const completed = new Set(plan.completedItemIds || []);
  return (plan.days || []).map((day, index) => ({ ...day, index })).filter(day => {
    if (plan.checklist === 'story') return (day.storyIds || []).some(id => !completed.has(id));
    return !chapterDayState(plan, day).complete;
  }).slice(0, count);
}

function renderHome() {
  const journey = allPlansProgress();
  const activePlan = state.plans.find(plan => planProgress(plan).percent < 100) || state.plans[0];
  const days = activePlan ? nextPlanDays(activePlan) : [];
  const readingContext = planReadingContext();
  let continueTitle = 'Começar uma leitura', continueMeta = 'Nenhuma leitura iniciada.', continueAttributes = 'data-page="reader"';
  if (readingContext) {
    continueTitle = `${readingContext.chapter.book} ${readingContext.chapter.chapter}`;
    continueMeta = `${readingContext.plan.title} · ${readingContext.reading.label}`;
    continueAttributes = 'data-action="resume-plan-reading"';
  } else if (activePlan) {
    if (activePlan.checklist === 'story') {
      const next = nextStoryPosition(activePlan);
      if (next?.story) { continueTitle = next.story.title; continueMeta = `${activePlan.title} · Dia ${next.dayIndex + 1}`; }
    } else {
      const nextDay = days[0];
      const completed = new Set(activePlan.completedChapterIds || []);
      const nextChapter = nextDay?.chapters?.find(chapter => !completed.has(chapterItemId(chapter)));
      if (nextChapter) { continueTitle = `${nextChapter.book} ${nextChapter.chapter}`; continueMeta = `${activePlan.title} · Dia ${nextDay.index + 1}`; }
    }
    continueAttributes = `data-action="start-plan-reading" data-plan-id="${activePlan.id}"`;
  }
  const planCounts = state.plans.reduce((counts, plan) => {
    const progress = planProgress(plan);
    if (progress.percent === 100) counts.complete += 1;
    else if (progress.done > 0 || state.planReading?.planId === plan.id) counts.started += 1;
    else counts.notStarted += 1;
    return counts;
  }, { complete: 0, started: 0, notStarted: 0 });
  const articleEntries = Object.values(state.articleProgress || {});
  const articlesStarted = articleEntries.filter(item => item?.started).length;
  const articlesComplete = articleEntries.filter(item => item?.complete).length;
  const readingStatus = readingContext ? 'Em andamento' : journey.total && journey.done === journey.total ? 'Completa' : state.plans.length ? 'Não iniciada' : 'Sem plano';
  return `<section class="page">
    ${pageHead('Início', 'Visão geral.', 'Um resumo direto do que você começou e concluiu.')}
    <div class="home-summary-grid">
      <button class="summary-card" data-page="plans"><span class="summary-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg></span><span><small>Planos</small><strong>${planCounts.started} iniciados · ${planCounts.complete} concluídos</strong></span></button>
      <button class="summary-card" data-page="studies"><span class="summary-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg></span><span><small>Artigos</small><strong>${articlesStarted} iniciados · ${articlesComplete} concluídos</strong></span></button>
      <button class="summary-card" ${continueAttributes}><span class="summary-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23zM20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23z"/></svg></span><span><small>Leitura</small><strong>${readingStatus}</strong><em>${esc(continueTitle)}</em></span></button>
    </div>
  </section>`;
}

function renderBibleLibrary() {
  if (!bibleLibraryOpen) return '';
  return `<section class="bible-library" role="dialog" aria-modal="true" aria-labelledby="bible-library-title">
    <div class="bible-library-head"><div><p class="section-kicker">Bíblias offline e online</p><h2 id="bible-library-title">Versões disponíveis</h2></div><button class="icon-button" data-action="close-bible-library" aria-label="Fechar">×</button></div>
    <div class="bible-version-list">${[...bibleCatalog].sort((a, b) => Number(!!b.recommended) - Number(!!a.recommended)).map(version => {
      const installed = installedBibleIds.includes(version.id);
      const size = version.online ? 'Requer internet' : `${(version.byteSize / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
      return `<article class="bible-version-item">
        <div><span class="version-abbr">${esc(version.abbreviation)}${version.recommended ? ' · Selecionada' : ''}</span><h3>${esc(version.name)}</h3><p>${esc(version.completeness)} · ${version.bookCount} livros · ${size}</p>${version.description ? `<p>${esc(version.description)}</p>` : ''}<small>${esc(version.license)}</small></div>
        <div class="version-actions"><a href="${esc(version.sourceUrl)}" target="_blank" rel="noreferrer">Direitos e fonte</a>${version.online ? '<span>Disponível no seletor · Online</span>' : installed
          ? `<button class="button button-outline" data-remove-bible="${version.id}">Remover</button>`
          : `<button class="button button-dark" data-install-bible="${version.id}">Baixar</button>`}</div>
      </article>`;
    }).join('')}
    <article class="bible-version-item"><div><span class="version-abbr">NTJ · PDF pessoal</span><h3>Novo Testamento Judaico — David H. Stern</h3><p>Somente Novo Testamento · 170 páginas digitalizadas. Não inclui o Antigo Testamento nem navegação por versículo.</p></div><div class="version-actions"><a class="button button-outline" href="/api/bible/personal.pdf" target="_blank" rel="noreferrer">Abrir PDF neste computador</a></div></article>
    <article class="bible-version-item"><div><span class="version-abbr">KJA / KJF · Pendente</span><h3>King James em português</h3><p>A BIBLIAAPI lista estas edições, mas exige chave de acesso. Ainda não conectadas.</p></div><div class="version-actions"><a href="https://bibliaapi.com.br/" target="_blank" rel="noreferrer">Acessar fornecedor</a></div></article>
    </div>
  </section>`;
}

function planReadingContext() {
  const reading = state.planReading;
  if (!reading) return null;
  const plan = state.plans.find(item => item.id === reading.planId);
  const chapterIds = (reading.chapterIds || []).filter(id => chapterFromId(id));
  if (!plan || !chapterIds.length) return null;
  const position = Math.max(0, Math.min(Number(reading.position) || 0, chapterIds.length - 1));
  return { reading, plan, chapterIds, position, chapter: chapterFromId(chapterIds[position]) };
}

function readerIsAtPlanPosition(context = planReadingContext()) {
  return Boolean(context && state.reader.bookCode === context.chapter.code && Number(state.reader.chapter) === context.chapter.chapter);
}

function installedVersionForPlan(plan) {
  const installed = bibleCatalog.filter(bibleAvailable);
  return installed.find(version => version.name === plan.version || version.abbreviation === plan.version) || installed[0];
}

function openPlanReading(plan, chapterIds, options = {}) {
  const completed = new Set(plan.completedChapterIds || []);
  const firstPending = chapterIds.findIndex(id => !completed.has(id));
  const position = firstPending >= 0 ? firstPending : 0;
  const chapter = chapterFromId(chapterIds[position]);
  if (!chapter) return;
  state.planReading = {
    planId: plan.id,
    chapterIds,
    position,
    dayIndex: Number.isInteger(options.dayIndex) ? options.dayIndex : null,
    storyId: options.storyId || null,
    groupId: options.groupId || null,
    label: options.label || 'Leitura do plano',
    stageComplete: false,
  };
  const version = installedVersionForPlan(plan);
  if (!version) {
    state.page = 'plan-reader';
    bibleLibraryOpen = true;
    persist();
    renderPage('plan-reader');
    toast('Baixe uma versão da Bíblia para iniciar a leitura.');
    return;
  }
  state.reader = { versionId: version.id, bookCode: chapter.code, chapter: chapter.chapter, verse: '' };
  state.selectedVerse = null;
  bibleLibraryOpen = false;
  persist();
  renderPage('plan-reader');
}

function startPlanReading(planId, options = {}) {
  const plan = state.plans.find(item => item.id === planId);
  if (!plan) return;
  if (plan.checklist === 'story' && !options.storyId) {
    const next = nextStoryPosition(plan);
    if (next?.story) startPlanReading(plan.id, { storyId: next.story.id, dayIndex: next.dayIndex });
    return;
  }
  if (plan.checklist === 'book' && !options.groupId) {
    const next = planProgressItems(plan).find(item => !planProgressItemState(plan, item).complete);
    if (next) startPlanReading(plan.id, { groupId: next.id });
    return;
  }
  if (options.storyId) {
    const story = storyFromId(options.storyId);
    const chapters = story ? storyChapterSequence(story) : [];
    const dayIndex = Number.isInteger(options.dayIndex)
      ? options.dayIndex
      : (plan.days || []).findIndex(day => (day.storyIds || []).includes(options.storyId));
    if (story && chapters.length) openPlanReading(plan, chapters.map(chapterItemId), {
      ...options,
      dayIndex: dayIndex >= 0 ? dayIndex : null,
      label: story.title,
    });
    return;
  }
  if (options.groupId) {
    const item = planProgressItems(plan).find(candidate => candidate.id === options.groupId);
    if (item?.chapterIds?.length) openPlanReading(plan, item.chapterIds, { ...options, label: item.label });
    return;
  }
  let dayIndex = Number.isInteger(options.dayIndex) ? options.dayIndex : -1;
  if (dayIndex < 0) dayIndex = (plan.days || []).findIndex(day => !chapterDayState(plan, day).complete);
  if (dayIndex < 0) dayIndex = 0;
  const day = plan.days?.[dayIndex];
  const chapterIds = (day?.chapters || []).map(chapterItemId);
  if (chapterIds.length) openPlanReading(plan, chapterIds, { dayIndex, label: `Dia ${dayIndex + 1}` });
}

function renderPlanReadingBar() {
  if (state.page !== 'plan-reader') return '';
  const context = planReadingContext();
  if (!context) return '';
  const { reading, plan, chapterIds, position, chapter } = context;
  const currentChapter = chapterFromId(`${state.reader.bookCode}:${state.reader.chapter}`) || chapter;
  const atPlanPosition = readerIsAtPlanPosition(context);
  const completed = new Set(plan.completedChapterIds || []);
  const done = chapterIds.filter(id => completed.has(id)).length;
  const dots = chapterIds.map((id, index) => `<span class="${completed.has(id)?'complete':''} ${index===position?'current':''}" title="${esc(chapterFromId(id)?.book || '')} ${chapterFromId(id)?.chapter || ''}"></span>`).join('');
  return `<section class="plan-reading-bar ${atPlanPosition?'':'browsing'}"><div class="plan-reading-copy"><small>${atPlanPosition?`${esc(plan.title)} · ${esc(reading.label)}`:'Consulta · seu progresso continua no plano'}</small><strong>${esc(currentChapter.book)} ${currentChapter.chapter}</strong>${atPlanPosition?'':`<span>Leitura do plano: ${esc(chapter.book)} ${chapter.chapter}</span>`}</div><div class="plan-reading-status"><span>${done}/${chapterIds.length}</span><div class="plan-reading-dots">${dots}</div></div><div class="plan-reading-actions"><button class="button button-outline plan-back-button" data-action="back-to-plan">Voltar ao plano</button>${atPlanPosition?'':`<button class="button button-dark plan-resume-button" data-action="resume-plan-reading">Retomar ${esc(chapter.book)} ${chapter.chapter}</button>`}</div></section>`;
}

function renderPlanReadingFooter() {
  if (state.page !== 'plan-reader') return '';
  const context = planReadingContext();
  if (!context) return '';
  const { chapter, position, chapterIds, plan } = context;
  if (state.reader.bookCode !== chapter.code || Number(state.reader.chapter) !== chapter.chapter) return '';
  const complete = (plan.completedChapterIds || []).includes(chapterIds[position]);
  return `<section class="plan-reading-footer"><div><strong>${esc(chapter.book)} ${chapter.chapter}</strong><small>${position + 1} de ${chapterIds.length}</small></div><button class="button button-dark" data-action="complete-plan-reading-chapter">${complete?'Próximo':'Concluir'}</button></section>`;
}

function planReadingCompletionDetails(context) {
  const { reading, plan } = context;
  if (plan.checklist === 'story') {
    return {
      kicker: `Dia ${Number(reading.dayIndex) + 1}`,
      title: 'Leitura do dia concluída',
      message: 'Você concluiu todas as histórias previstas para hoje.',
    };
  }
  if (plan.checklist === 'book') {
    return {
      kicker: plan.bookCheckMode === 'category' ? 'Tipo de livro' : 'Livro',
      title: plan.bookCheckMode === 'category' ? 'Etapa concluída' : 'Livro concluído',
      message: `Você concluiu toda a leitura de ${reading.label}.`,
    };
  }
  return {
    kicker: `Dia ${Number(reading.dayIndex) + 1}`,
    title: 'Leitura do dia concluída',
    message: 'Você concluiu todos os capítulos previstos para hoje.',
  };
}

function nextPlanReadingStage(context) {
  const { reading, plan } = context;
  if (plan.checklist === 'story') {
    const next = nextStoryPosition(plan, reading.dayIndex, reading.storyId);
    return next?.story ? { type: 'story', ...next } : null;
  }
  if (plan.checklist === 'book') {
    const items = planProgressItems(plan);
    const currentIndex = items.findIndex(item => item.id === reading.groupId);
    const ordered = currentIndex >= 0 ? [...items.slice(currentIndex + 1), ...items.slice(0, currentIndex + 1)] : items;
    const item = ordered.find(candidate => !planProgressItemState(plan, candidate).complete);
    return item ? { type: 'group', item } : null;
  }
  const dayIndex = (plan.days || []).findIndex(day => !chapterDayState(plan, day).complete);
  return dayIndex >= 0 ? { type: 'day', dayIndex } : null;
}

function renderPlanReadingCompletion() {
  if (state.page !== 'plan-reader') return '';
  const context = planReadingContext();
  if (!context?.reading.stageComplete) return '';
  const details = planReadingCompletionDetails(context);
  const next = nextPlanReadingStage(context);
  return `<div class="plan-stage-complete-backdrop">
    <section class="plan-stage-complete" role="dialog" aria-modal="true" aria-labelledby="plan-stage-complete-title">
      <span class="plan-stage-complete-check" aria-hidden="true">✓</span>
      <p class="section-kicker">${esc(details.kicker)}</p>
      <h2 id="plan-stage-complete-title">${esc(details.title)}</h2>
      <p>${esc(details.message)}</p>
      <div class="plan-stage-complete-actions">
        <button class="button button-outline" data-action="finish-plan-reading-stage">Voltar ao plano</button>
        <button class="button button-dark" data-action="continue-plan-reading">${next ? 'Continuar' : 'Ver plano'}</button>
      </div>
    </section>
  </div>`;
}

function resumePlanReading() {
  const context = planReadingContext();
  if (!context) return;
  state.reader.bookCode = context.chapter.code;
  state.reader.chapter = context.chapter.chapter;
  state.reader.verse = '';
  state.selectedVerse = null;
  persist();
  renderPage('plan-reader');
}

function backToActivePlan() {
  const context = planReadingContext();
  if (!context) return;
  expandedPlanId = context.plan.id;
  selectedPlanDay = Number.isInteger(context.reading.dayIndex)
    ? { planId: context.plan.id, index: context.reading.dayIndex }
    : null;
  planFormOpen = false;
  renderPage('plans');
}

function completePlanReadingChapter() {
  if (state.page !== 'plan-reader') return;
  const context = planReadingContext();
  if (!context) return;
  const { reading, plan, chapterIds, position } = context;
  const completed = new Set(plan.completedChapterIds || []);
  completed.add(chapterIds[position]);
  plan.completedChapterIds = [...completed];
  if (reading.storyId && chapterIds.every(id => completed.has(id))) {
    const stories = new Set(plan.completedItemIds || []);
    stories.add(reading.storyId);
    plan.completedItemIds = [...stories];
  }
  if (position < chapterIds.length - 1) {
    state.planReading.position = position + 1;
    persist();
    resumePlanReading();
    return;
  }
  if (reading.storyId) {
    const day = plan.days?.[reading.dayIndex];
    if (day && !storyDayState(plan, day).complete) {
      const nextStoryId = (day.storyIds || []).find(id => !(plan.completedItemIds || []).includes(id));
      if (nextStoryId) {
        startPlanReading(plan.id, { storyId: nextStoryId, dayIndex: reading.dayIndex });
        return;
      }
    }
  }
  state.planReading.stageComplete = true;
  persist();
  renderPage('plan-reader');
}

function continuePlanReading() {
  const context = planReadingContext();
  if (!context) return;
  const next = nextPlanReadingStage(context);
  if (next?.type === 'story') {
    startPlanReading(context.plan.id, { storyId: next.story.id, dayIndex: next.dayIndex });
    return;
  }
  if (next?.type === 'group') {
    startPlanReading(context.plan.id, { groupId: next.item.id });
    return;
  }
  if (next?.type === 'day') {
    startPlanReading(context.plan.id, { dayIndex: next.dayIndex });
    return;
  }
  finishPlanReadingStage(true);
}

function finishPlanReadingStage(planComplete = false) {
  const context = planReadingContext();
  if (!context) return;
  const plan = context.plan;
  state.planReading = null;
  expandedPlanId = plan.id;
  selectedPlanDay = Number.isInteger(context.reading.dayIndex)
    ? { planId: plan.id, index: context.reading.dayIndex }
    : null;
  persist();
  renderPage('plans');
  if (planComplete) toast('Plano concluído.');
}

function renderReader() {
  const isPlanReader = state.page === 'plan-reader' && Boolean(planReadingContext());
  const installedVersions = bibleCatalog.filter(bibleAvailable);
  const version = installedVersions.find(item => item.id === state.reader.versionId);
  if (!version) {
    return `<section class="reader-empty-page">
      <button class="reader-library-trigger" data-action="open-bible-library" aria-label="Baixar uma versão da Bíblia"><span>+</span><strong>Baixar uma Bíblia</strong></button>
      ${renderBibleLibrary()}
    </section>`;
  }
  let book = version.books.find(item => item.code === state.reader.bookCode);
  if (!book) {
    book = version.books[0];
    state.reader.bookCode = book.code;
    state.reader.chapter = 1;
    state.reader.verse = '';
  }
  if (state.reader.chapter > book.chapters) state.reader.chapter = 1;
  const oldTestament = version.books.filter(item => item.order <= 39);
  const newTestament = version.books.filter(item => item.order > 39);
  const verseOptions = activeChapter &&
    activeChapter.versionId === state.reader.versionId &&
    activeChapter.bookCode === state.reader.bookCode &&
    activeChapter.chapter === state.reader.chapter
      ? activeChapter.verses
      : [];
  const planContext = isPlanReader ? planReadingContext() : null;
  return `<section class="reader-page">
    <div class="reader-main">
      <div class="reader-toolbar ${isPlanReader?'plan-reader-toolbar':''}"><div class="reader-toolbar-inner">
        ${isPlanReader?`<div class="plan-reader-toolbar-content"><div class="plan-reader-identity">${renderBreadcrumb([{label:'Planos de leitura',page:'plans'},{label:planContext.plan.title,action:'back-to-plan'},{label:planContext.reading.label}],'reader-breadcrumb')}</div><div class="plan-reader-chapter-nav" aria-label="Consultar outros capítulos"><button class="reader-chapter-step" data-action="previous-reader-chapter" aria-label="Capítulo anterior">‹</button><span title="${esc(book.name)} ${state.reader.chapter}">${esc(book.name)} ${state.reader.chapter}</span><button class="reader-chapter-step" data-action="next-reader-chapter" aria-label="Próximo capítulo">›</button></div></div>`:`<div class="reader-navigation">
          <button class="reader-chapter-step" data-action="previous-reader-chapter" aria-label="Capítulo anterior">‹</button>
          <div class="reader-location">
            <select id="reader-book" class="reader-location-select reader-book-select" aria-label="Livro">${version.books.map(item=>`<option value="${item.code}" ${item.code===book.code?'selected':''}>${esc(item.name)}</option>`).join('')}</select>
            <span aria-hidden="true"></span>
            <select id="reader-chapter" class="reader-location-select reader-chapter-select" aria-label="Capítulo">${Array.from({length:book.chapters},(_,index)=>`<option value="${index+1}" ${index+1===state.reader.chapter?'selected':''}>${index+1}</option>`).join('')}</select>
          </div>
          <button class="reader-chapter-step" data-action="next-reader-chapter" aria-label="Próximo capítulo">›</button>
        </div>`}
      </div></div>
      ${isPlanReader?renderPlanReadingBar():''}
      <article id="reader-canvas" class="reader-canvas" style="--reader-text-scale:${readerTextScale()}"><p class="reader-loading">Carregando capítulo...</p></article>
      ${renderBibleLibrary()}
      ${renderCommentComposer(version, book)}
      ${isPlanReader?renderPlanReadingCompletion():''}
    </div>
  </section>`;
}

async function loadCurrentChapter() {
  const canvas = document.getElementById('reader-canvas');
  if (!canvas || !state.reader.versionId) return;
  const reference = JSON.stringify(state.reader);
  try {
    const loadedChapter = await readOfflineChapter();
    if (!canvas.isConnected || reference !== JSON.stringify(state.reader)) return;
    activeChapter = loadedChapter;
    if (!activeChapter) {
      canvas.innerHTML = '<p class="reader-loading">Este capítulo não está disponível offline. Reinstale a versão.</p>';
      return;
    }
    const version = bibleCatalog.find(item => item.id === state.reader.versionId);
    canvas.innerHTML = `<p class="chapter-overline">${esc(version.abbreviation)} · ${esc(version.license)}</p><h1>${esc(activeChapter.bookName)} ${activeChapter.chapter}</h1>
      ${activeChapter.verses.map(verse => {
        const key = currentVerseKey(verse.number), highlight = state.highlights[key], comment = state.comments[key];
        const number = verse.end !== verse.number ? `${verse.number}-${verse.end}` : verse.number;
        return `<span class="verse ${highlight?`highlight-${highlight}`:''} ${comment?'has-comment':''} ${String(state.reader.verse)===String(verse.number)?'verse-focused':''}" data-verse="${verse.number}"><sup>${number}</sup><span class="verse-copy">${esc(verse.text)}</span>${comment?`<span class="verse-comment-tip" hidden>${esc(comment)}</span>`:''}</span>`;
      }).join('')}
      ${state.page==='plan-reader'?renderPlanReadingFooter():''}
      <footer class="bible-attribution">${esc(version.attribution)} <a href="${esc(version.licenseUrl)}" target="_blank" rel="noreferrer">Licença</a></footer>`;
    updateVerseSelect();
    focusSelectedVerse();
    attachVerseHover();
  } catch (error) {
    if (!canvas.isConnected || reference !== JSON.stringify(state.reader)) return;
    activeChapter = null;
    console.error(error);
    canvas.innerHTML = `<p class="reader-loading">${esc(error.message || 'Não foi possível abrir este capítulo.')}</p>`;
  }
}

function updateVerseSelect() {
  const select = document.getElementById('reader-verse');
  if (!select) return;
  const verses = activeChapter?.verses || [];
  select.innerHTML = `<option value="">Versículo</option>${verses.map(verse => `<option value="${verse.number}" ${String(verse.number)===String(state.reader.verse)?'selected':''}>Versículo ${verse.number}</option>`).join('')}`;
  select.disabled = !verses.length;
  if (state.reader.verse && !verses.some(verse => String(verse.number) === String(state.reader.verse))) {
    state.reader.verse = '';
    persist();
    select.value = '';
  }
}

function focusSelectedVerse() {
  if (!state.reader.verse) return;
  const verse = document.querySelector(`.verse[data-verse="${state.reader.verse}"]`);
  if (!verse) return;
  requestAnimationFrame(() => verse.scrollIntoView({ behavior: 'smooth', block: 'center' }));
}

function buildChapterSequence(method, scope) {
  const included = book => scope === 'all' || book.testament === scope;
  if (method === 'chronological' && chronologicalPlanReady) {
    return chronologicalReadingDays.flatMap((day, sourceDayIndex) => day.chapters.map(item => {
      const book = bibleBooks.find(candidate => candidate.code === item.code);
      return book && included(book) ? { book: book.name, code: book.code, chapter: item.chapter, sourceDayIndex } : null;
    }).filter(Boolean));
  }
  let books = bibleBooks.filter(included);
  if (method === 'chronological') books = chronologicalBookOrder.map(name => books.find(book => book.name === name)).filter(Boolean);
  return books.flatMap(book => Array.from({length:book.chapters},(_,index)=>({book:book.name,code:book.code,chapter:index+1})));
}

function chapterItemId(chapter) {
  return `${chapter.code}:${chapter.chapter}`;
}

function chapterFromId(id) {
  const [code, rawChapter] = String(id).split(':');
  const book = bibleBooks.find(item => item.code === code);
  const chapter = Number(rawChapter);
  return book && chapter >= 1 && chapter <= book.chapters ? { book: book.name, code, chapter } : null;
}

function balancedChunks(items, totalDays, boundaryKey) {
  const chunks = [];
  let position = 0;
  for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
    const remainingDays = totalDays - dayIndex;
    const remainingItems = items.length - position;
    const maximum = remainingItems - (remainingDays - 1);
    const target = Math.max(1, Math.min(maximum, Math.round(remainingItems / remainingDays)));
    let count = target;
    if (boundaryKey && remainingDays > 1) {
      const candidate = [target, target - 1, target + 1, target - 2, target + 2].find(value => {
        if (value < 1 || value > maximum || position + value >= items.length) return false;
        return boundaryKey(items[position + value - 1]) !== boundaryKey(items[position + value]);
      });
      if (candidate) count = candidate;
    }
    chunks.push(items.slice(position, position + count));
    position += count;
  }
  return chunks;
}

function storyReadingWeight(story) {
  const reference = String(story?.reference || '');
  const range = reference.match(/(\d+)(?:[–-](\d+))?/);
  if (!range) return 1;
  return Math.max(1, Number(range[2] || range[1]) - Number(range[1]) + 1);
}

function balancedStoryChunks(stories, totalDays) {
  const chunks = [];
  let position = 0;
  let remainingWeight = stories.reduce((total, story) => total + storyReadingWeight(story), 0);
  for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
    const remainingDays = totalDays - dayIndex;
    const maximumCount = stories.length - position - (remainingDays - 1);
    const targetWeight = remainingWeight / remainingDays;
    let runningWeight = 0;
    let bestCount = 1;
    let bestWeight = storyReadingWeight(stories[position]);
    let bestScore = Number.POSITIVE_INFINITY;
    for (let count = 1; count <= maximumCount; count += 1) {
      runningWeight += storyReadingWeight(stories[position + count - 1]);
      const relativeDifference = Math.abs(runningWeight - targetWeight) / Math.max(1, targetWeight);
      const nextStory = stories[position + count];
      const closesGroup = !nextStory || stories[position + count - 1].groupNumber !== nextStory.groupNumber;
      const score = relativeDifference - (closesGroup && relativeDifference <= .18 ? .025 : 0);
      if (score < bestScore) {
        bestScore = score;
        bestCount = count;
        bestWeight = runningWeight;
      }
      if (runningWeight > targetWeight && relativeDifference > bestScore + .2) break;
    }
    chunks.push(stories.slice(position, position + bestCount));
    position += bestCount;
    remainingWeight -= bestWeight;
  }
  return chunks;
}

function formatReading(chapters) {
  if (!chapters.length) return '';
  const groups=[];
  let current={book:chapters[0].book,start:chapters[0].chapter,end:chapters[0].chapter};
  for(let i=1;i<chapters.length;i++){
    const ch=chapters[i];
    if(ch.book===current.book && ch.chapter===current.end+1) current.end=ch.chapter;
    else { groups.push(current); current={book:ch.book,start:ch.chapter,end:ch.chapter}; }
  }
  groups.push(current);
  return groups.map(g=>`${g.book} ${g.start}${g.end!==g.start?`–${g.end}`:''}`).join(' · ');
}

function planDurationLabel(duration) {
  if (duration === 'custom') return 'No meu tempo';
  const months = Number(duration);
  return months === 12 ? '1 ano' : `${months} ${months === 1 ? 'mês' : 'meses'}`;
}

function planMethodLabel(method) {
  return method === 'chronological' ? 'Cronológico' : 'Canônico';
}

function resetPlanDraft() {
  state.plan = { ...structuredClone(defaultState.plan), version: state.plan.version || bibleCatalog.find(bibleAvailable)?.name || '' };
}

function planTargetDays(itemCount, duration) {
  const requested = duration === 'custom' ? itemCount : Math.round(Number(duration) * 30.4375);
  return Math.max(1, Math.min(itemCount, requested));
}

function planDayDate(start, index, duration) {
  if (duration === 'custom') return `Etapa ${index + 1}`;
  const date = new Date(start);
  date.setDate(start.getDate() + index);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
}

function storyStartChapter(story) {
  const book = bibleBooks.find(item => item.name === story.book);
  const reference = story.reference.startsWith(story.book) ? story.reference.slice(story.book.length) : story.reference;
  const chapter = Number(reference.match(/\d+/)?.[0] || 1);
  return book ? { book: book.name, code: book.code, chapter } : null;
}

function storySequence(method, scope) {
  const stories = bibleStoryDefinitions.filter(story => scope === 'all' || story.testament === scope);
  if (method !== 'chronological' || !chronologicalPlanReady) return stories;
  const positions = new Map(buildChapterSequence('chronological', 'all').map((chapter, index) => [chapterItemId(chapter), index]));
  return [...stories].sort((left, right) => {
    const leftStart = storyStartChapter(left);
    const rightStart = storyStartChapter(right);
    const leftPosition = leftStart ? positions.get(chapterItemId(leftStart)) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
    const rightPosition = rightStart ? positions.get(chapterItemId(rightStart)) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
    return leftPosition - rightPosition || left.order - right.order;
  });
}

function storyPlanPace(scope, duration, method = 'canonical') {
  const stories = storySequence(method, scope);
  if (!stories.length) return { stories: 0, days: 0, minimum: 0, maximum: 0, averageChapters: 0 };
  const days = planTargetDays(stories.length, duration);
  const chunks = balancedStoryChunks(stories, days);
  const counts = chunks.map(chunk => chunk.length);
  const totalWeight = stories.reduce((total, story) => total + storyReadingWeight(story), 0);
  return {
    stories: stories.length,
    days,
    minimum: Math.min(...counts),
    maximum: Math.max(...counts),
    averageChapters: Math.round(totalWeight / days),
  };
}

function storyPaceText(scope, duration, method = 'canonical') {
  const pace = storyPlanPace(scope, duration, method);
  if (!pace.stories) return 'Carregando histórias...';
  return `${pace.stories} histórias · ${pace.days} dias · média de ${pace.averageChapters} capítulos por dia`;
}

function chapterPaceText(scope, duration, method = 'canonical') {
  if (method === 'chronological' && !chronologicalPlanReady) return 'Carregando ordem cronológica...';
  const days = buildDailyPlanDays(method, scope, duration);
  if (!days.length) return 'Nenhum capítulo neste recorte';
  const total = days.reduce((sum, day) => sum + day.total, 0);
  const counts = days.map(day => day.total);
  const minimum = Math.min(...counts), maximum = Math.max(...counts);
  return `${total} capítulos · ${days.length} dias · ${minimum === maximum ? minimum : `${minimum} a ${maximum}`} por dia`;
}

function buildStoryPlanDays(scope, duration, method = 'canonical') {
  const sequence = storySequence(method, scope);
  if (!sequence.length) return [];
  const totalDays = planTargetDays(sequence.length, duration);
  const chunks = balancedStoryChunks(sequence, totalDays);
  const start = new Date();
  return chunks.map((chunk, index) => {
    const first = chunk[0];
    const last = chunk[chunk.length - 1];
    return {
      date: planDayDate(start, index, duration),
      reading: chunk.length === 1 ? first.title : `${chunk.length} histórias · ${first.reference} a ${last.reference}`,
      total: chunk.length,
      readingWeight: chunk.reduce((total, story) => total + storyReadingWeight(story), 0),
      storyIds: chunk.map(story => story.id),
    };
  });
}

function buildDailyPlanDays(method, scope, duration) {
  const sequence = buildChapterSequence(method, scope);
  if (!sequence.length) return [];
  let chunks;
  if (method === 'chronological' && chronologicalPlanReady) {
    const units = chronologicalReadingDays.map((sourceDay, sourceDayIndex) => sourceDay.chapters.map(item => {
      const book = bibleBooks.find(candidate => candidate.code === item.code);
      if (!book || (scope !== 'all' && book.testament !== scope)) return null;
      return { book: book.name, code: book.code, chapter: item.chapter, sourceDayIndex };
    }).filter(Boolean)).filter(unit => unit.length);
    chunks = balancedChunks(units, planTargetDays(units.length, duration)).map(unitChunk => unitChunk.flat());
  } else {
    chunks = balancedChunks(sequence, planTargetDays(sequence.length, duration));
  }
  const start = new Date();
  return chunks.map((chapters, index) => ({
    date: planDayDate(start, index, duration),
    reading: formatReading(chapters),
    total: chapters.length,
    chapters,
  }));
}

function generatePlan() {
  const storyPlan = state.plan.checklist === 'story';
  if (storyPlan && !bibleStoryCatalogReady) {
    toast('Aguarde o carregamento das histórias bíblicas.');
    return;
  }
  if (state.plan.method === 'chronological' && !chronologicalPlanReady) {
    toast('Aguarde o carregamento da ordem cronológica.');
    return;
  }
  const sequence = storyPlan
    ? storySequence(state.plan.method, state.plan.scope)
    : buildChapterSequence(state.plan.method, state.plan.scope);
  if (!sequence.length) return;
  const days = storyPlan
    ? buildStoryPlanDays(state.plan.scope, state.plan.duration, state.plan.method)
    : buildDailyPlanDays(state.plan.method, state.plan.scope, state.plan.duration);
  const editingIndex = state.plans.findIndex(plan => plan.id === state.plan.id);
  const previous = editingIndex >= 0 ? state.plans[editingIndex] : null;
  const plan = {
    ...state.plan,
    id: state.plan.id || (crypto.randomUUID ? crypto.randomUUID() : `plan-${Date.now()}`),
    title: state.plan.title.trim() || `${planMethodLabel(state.plan.method)} · ${state.plan.scope === 'all' ? 'Bíblia completa' : state.plan.scope === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}`,
    days,
    completedItemIds: (previous?.completedItemIds || []).filter(id => !storyPlan || sequence.some(story => story.id === id)),
    completedChapterIds: (previous?.completedChapterIds || []).filter(id => days.some(day => (day.chapters || []).some(chapter => chapterItemId(chapter) === id))),
    createdAt: previous?.createdAt || new Date().toISOString()
  };
  if (editingIndex >= 0) state.plans.splice(editingIndex, 1, plan);
  else state.plans.push(plan);
  resetPlanDraft();
  expandedPlanId=null;
  selectedPlanDay=null;
  planFormOpen=false;
  persist();
  const pace = storyPlan ? storyPlanPace(plan.scope, plan.duration, plan.method) : null;
  toast(storyPlan
    ? `${editingIndex >= 0 ? 'Plano atualizado' : 'Plano criado'}: ${sequence.length} histórias em ${pace.days} dias.`
    : `${editingIndex >= 0 ? 'Plano atualizado' : 'Plano criado'} com ${sequence.length} capítulos.`);
  renderPage('plans');
}

function renderPlanDayDetail(plan, day, index) {
  const chapters = day.chapters || [];
  const dayState = chapterDayState(plan, day);
  const actionLabel = dayState.complete ? 'Reler bloco' : dayState.done ? 'Continuar leitura' : 'Iniciar leitura';
  return `<section class="day-detail"><div class="day-detail-head"><div><p class="section-kicker">Dia ${index + 1} · ${esc(day.date)}</p><h3>${esc(day.reading)}</h3><small>${dayState.done} de ${dayState.total} capítulos concluídos</small></div><button class="text-button" data-action="close-day-detail" data-plan-id="${plan.id}">Fechar</button></div><div class="day-detail-actions"><button class="button button-dark" data-action="start-plan-reading" data-plan-id="${plan.id}" data-plan-day-index="${index}">${actionLabel}</button></div><div class="chapter-checks">${chapters.map(chapter=>{
    const id=chapterItemId(chapter),complete=(plan.completedChapterIds||[]).includes(id);
    return `<button class="chapter-check ${complete?'complete':''}" data-plan-chapter="${id}" data-plan-id="${plan.id}" aria-pressed="${complete}"><span>${complete?'✓':'○'}</span><strong>${esc(chapter.book)} ${chapter.chapter}</strong></button>`;
  }).join('')}</div></section>`;
}

function storyFromId(id) {
  return bibleStoryDefinitions.find(story => story.id === id);
}

function chapterDayState(plan, day) {
  const completed = new Set(plan.completedChapterIds || []);
  const ids = (day.chapters || []).map(chapterItemId);
  const done = ids.filter(id => completed.has(id)).length;
  return { done, total: ids.length, complete: ids.length > 0 && done === ids.length, partial: done > 0 && done < ids.length };
}

function storyDayState(plan, day) {
  const completed = new Set(plan.completedItemIds || []);
  const ids = day.storyIds || [];
  const done = ids.filter(id => completed.has(id)).length;
  return { done, total: ids.length, complete: ids.length > 0 && done === ids.length, partial: done > 0 && done < ids.length };
}

function nextStoryPosition(plan, afterDayIndex = null, afterStoryId = null) {
  const completed = new Set(plan.completedItemIds || []);
  const positions = (plan.days || []).flatMap((day, dayIndex) => (day.storyIds || []).map(storyId => ({
    dayIndex,
    storyId,
    story: storyFromId(storyId),
  }))).filter(position => position.story);
  if (!Number.isInteger(afterDayIndex) || !afterStoryId) {
    return positions.find(position => !completed.has(position.storyId)) || null;
  }
  const anchor = positions.findIndex(position => position.dayIndex === afterDayIndex && position.storyId === afterStoryId);
  const ordered = anchor >= 0 ? [...positions.slice(anchor + 1), ...positions.slice(0, anchor + 1)] : positions;
  return ordered.find(position => !completed.has(position.storyId)) || null;
}

function storyChapterSequence(story) {
  const start = storyStartChapter(story);
  if (!start) return [];
  const reference = story.reference.startsWith(story.book) ? story.reference.slice(story.book.length) : story.reference;
  const match = reference.match(/(\d+)(?:[–-](\d+))?/);
  const first = Number(match?.[1] || start.chapter);
  const last = Number(match?.[2] || first);
  return Array.from({ length: last - first + 1 }, (_, index) => ({ ...start, chapter: first + index }));
}

function renderStoryResume(plan) {
  const next = nextStoryPosition(plan);
  if (!next?.story) return `<div class="story-resume complete"><span class="panel-label">Plano concluído</span><strong>Todas as histórias foram lidas.</strong></div>`;
  return `<button class="story-resume" data-action="start-story-reading" data-story-id="${next.story.id}" data-plan-id="${plan.id}"><span class="panel-label">Continuar leitura · Dia ${next.dayIndex + 1}</span><strong>${esc(next.story.title)}</strong><small>${esc(next.story.reference)} · ${esc(next.story.groupTitle)}</small></button>`;
}

function renderStoryDayDetail(plan, day, index) {
  const stories = (day.storyIds || []).map(storyFromId).filter(Boolean);
  const stateForDay = storyDayState(plan, day);
  const readingWeight = day.readingWeight || stories.reduce((total, story) => total + storyReadingWeight(story), 0);
  return `<section class="day-detail story-day-detail"><div class="day-detail-head"><div><p class="section-kicker">Dia ${index + 1} · ${esc(day.date)}</p><h3>${stories.length} ${stories.length===1?'história':'histórias'} · ${readingWeight} ${readingWeight===1?'capítulo':'capítulos'}</h3><small>${stateForDay.done} de ${stateForDay.total} concluídas</small></div><button class="text-button" data-action="close-day-detail" data-plan-id="${plan.id}">Fechar</button></div><div class="story-reading-list">${stories.map(story=>{
    const complete=(plan.completedItemIds||[]).includes(story.id);
    return `<article class="story-reading-row ${complete?'complete':''}"><button class="story-reading-check" data-plan-progress-item="${story.id}" data-plan-id="${plan.id}" aria-pressed="${complete}" aria-label="${complete?'Reabrir':'Concluir'} ${esc(story.title)}"><span class="milestone-check">${complete?'✓':'○'}</span></button><span><strong>${esc(story.title)}</strong><small>${esc(story.reference)} · ${esc(story.groupTitle)}</small></span><button class="text-button" data-action="start-story-reading" data-story-id="${story.id}" data-plan-id="${plan.id}">${complete?'Reler':'Ler'}</button></article>`;
  }).join('')}</div></section>`;
}

function renderPlanDayJump(plan, selected) {
  return `<label class="plan-day-jump"><span>Ir para o dia</span><select data-plan-day-select data-plan-id="${plan.id}"><option value="">Selecionar</option>${(plan.days || []).map((day,index)=>`<option value="${index}" ${selected===index?'selected':''}>Dia ${index+1} · ${esc(day.reading)}</option>`).join('')}</select></label>`;
}

function renderPlanChecklist(plan) {
  const progress = planProgress(plan);
  if (plan.checklist === 'story') {
    const selected = selectedPlanDay?.planId === plan.id ? selectedPlanDay.index : null;
    return `<div class="story-resume-slot">${renderStoryResume(plan)}</div><div class="story-schedule-meta">${storyPaceText(plan.scope,plan.duration,plan.method)}</div>${renderPlanDayJump(plan,selected)}<div class="plan-day-map">${plan.days.map((day,index)=>{
      const dayState=storyDayState(plan,day);
      const readingWeight = day.readingWeight || (day.storyIds || []).map(storyFromId).filter(Boolean).reduce((total, story) => total + storyReadingWeight(story), 0);
      return `<button class="plan-day-dot ${dayState.complete?'complete':dayState.partial?'partial':''} ${selected===index?'selected':''}" data-plan-day="${index}" data-plan-id="${plan.id}" title="Dia ${index+1} · ${dayState.total} histórias · ${readingWeight} capítulos" aria-label="Abrir dia ${index+1}: ${dayState.done} de ${dayState.total} histórias concluídas; ${readingWeight} capítulos previstos"><span>${index+1}</span></button>`;
    }).join('')}</div><div class="plan-day-detail" data-plan-day-detail>${selected!==null && plan.days[selected]?renderStoryDayDetail(plan,plan.days[selected],selected):''}</div>`;
  }
  if (plan.checklist === 'daily') {
    const selected = selectedPlanDay?.planId === plan.id ? selectedPlanDay.index : null;
    return `${renderPlanDayJump(plan,selected)}<div class="plan-day-map">${plan.days.map((day,index)=>{
      const dayState=chapterDayState(plan,day);
      return `<button class="plan-day-dot ${dayState.complete?'complete':dayState.partial?'partial':''} ${selected===index?'selected':''}" data-plan-day="${index}" data-plan-id="${plan.id}" title="Dia ${index+1} · ${dayState.done} de ${dayState.total}" aria-label="Abrir dia ${index+1}: ${dayState.done} de ${dayState.total} capítulos concluídos"><span>${index+1}</span></button>`;
    }).join('')}</div><div class="plan-day-detail" data-plan-day-detail>${selected!==null && plan.days[selected]?renderPlanDayDetail(plan,plan.days[selected],selected):''}</div>`;
  }
  return `<div class="plan-milestones">${progress.items.map(item=>{
    const itemState=planProgressItemState(plan,item);
    return `<button class="plan-milestone ${itemState.complete?'complete':itemState.partial?'partial':''}" data-action="start-plan-group-reading" data-plan-group="${item.id}" data-plan-id="${plan.id}"><span class="milestone-check">${itemState.complete?'✓':itemState.partial?'◐':'○'}</span><span><strong>${esc(item.label)}</strong><small>${itemState.done} de ${itemState.total} capítulos · ${esc(item.description)}</small></span></button>`;
  }).join('')}</div>`;
}

function renderBreadcrumb(items = [], className = '') {
  if (items.length < 2) return '';
  return `<nav class="page-breadcrumb ${className}" aria-label="Caminho da página">${items.map((item,index)=>{
    const last=index===items.length-1;
    const label=esc(item.label);
    const content=last?`<strong aria-current="page">${label}</strong>`:item.page?`<button data-page="${item.page}">${label}</button>`:item.action?`<button data-action="${item.action}">${label}</button>`:`<span>${label}</span>`;
    return `${index?'<span class="breadcrumb-separator" aria-hidden="true">›</span>':''}${content}`;
  }).join('')}</nav>`;
}

function renderPlanBreadcrumb(currentLabel = '') {
  const items=[{label:'Planos de leitura',page:'plans'},{label:'Seus planos',action:'plans-list'}];
  if(currentLabel)items.push({label:currentLabel});
  return renderBreadcrumb(items);
}

function renderPlanCard(plan, detailView = false) {
  const progress=planProgress(plan);
  const open=detailView || expandedPlanId===plan.id;
  const checklistLabel=plan.checklist==='story'?'Modo História':plan.checklist==='book'?(plan.bookCheckMode==='category'?'Tipo de livro':'Livro'):'Bloco diário';
  const scopeLabel=plan.scope==='all'?'Bíblia completa':plan.scope==='AT'?'Antigo Testamento':'Novo Testamento';
  const durationLabel=plan.checklist==='book'?'Sem prazo':planDurationLabel(plan.duration);
  const activeReading=planReadingContext()?.plan.id===plan.id;
  const actions=planManageMode?`<div class="reading-plan-actions"><button class="plan-manage-action" data-action="edit-plan" data-plan-id="${plan.id}">Editar</button><button class="plan-manage-action danger" data-action="delete-plan" data-plan-id="${plan.id}">Excluir</button></div>`:'';
  return `<article class="reading-plan ${open?'open':''} ${detailView?'plan-detail-card':''} ${planManageMode?'manage-mode':''}" data-plan-card="${plan.id}">
    ${detailView?`<header class="reading-plan-detail-head"><small>${planMethodLabel(plan.method)} · ${durationLabel} · ${checklistLabel}</small>${actions}</header>`:`<header class="reading-plan-head">
      <button class="reading-plan-toggle" data-action="toggle-plan" data-plan-id="${plan.id}" aria-label="Abrir ${esc(plan.title)}"><span><strong>${esc(plan.title)}</strong><small>${planMethodLabel(plan.method)} · ${durationLabel} · ${checklistLabel}</small></span><span class="plan-card-progress">${progress.percent}%</span></button>
      ${actions}
    </header>`}
    <div class="reading-plan-body" data-plan-body ${open?'':'hidden'}>
      <div class="plan-overview"><div class="plan-progress-copy"><strong class="plan-progress-value">${progress.percent}%</strong><small class="plan-progress-count">${progress.done}/${progress.total}</small></div><div class="plan-overview-meta"><span>${esc(plan.version || 'Sem versão')}</span><span>${scopeLabel}</span></div><button class="button button-dark plan-start-button" data-action="${activeReading?'resume-plan-reading':'start-plan-reading'}" data-plan-id="${plan.id}">${activeReading||progress.done?'Continuar':'Iniciar'}</button></div>
      <div class="progress-line"><span class="plan-progress-fill" style="width:${progress.percent}%"></span></div>
      ${renderPlanChecklist(plan)}
    </div>
  </article>`;
}

function renderPlanForm() {
  const durations=['custom',...Array.from({length:12},(_,index)=>String(index+1))];
  const editing=Boolean(state.plan.id);
  return `<div class="plan-builder">
    <aside class="builder-panel">
      <h2>${editing?'Editar plano':'Configurar plano'}</h2>
      <label class="field">Nome do plano<input id="plan-title" value="${esc(state.plan.title)}" placeholder="Ex.: Bíblia em seis meses" /></label>
      <label class="field">Método<div class="segmented" data-plan-field="method"><button data-value="canonical" class="${state.plan.method==='canonical'?'active':''}">Canônico</button><button data-value="chronological" class="${state.plan.method==='chronological'?'active':''}">Cronológico</button></div><small id="plan-method-description" class="field-help">${state.plan.method==='chronological'?'Ordem dos acontecimentos definida para a leitura cronológica.':'Ordem tradicional dos livros da Bíblia.'}</small></label>
      <label class="field">Conteúdo<select id="plan-scope"><option value="all" ${state.plan.scope==='all'?'selected':''}>Bíblia completa</option><option value="AT" ${state.plan.scope==='AT'?'selected':''}>Somente Antigo Testamento</option><option value="NT" ${state.plan.scope==='NT'?'selected':''}>Somente Novo Testamento</option></select></label>
      <label class="field" id="plan-duration-field" ${state.plan.checklist==='book'?'hidden':''}>Tempo para concluir<select id="plan-duration">${durations.map(duration=>`<option value="${duration}" ${state.plan.duration===duration?'selected':''}>${planDurationLabel(duration)}</option>`).join('')}</select></label>
      <label class="field">Versão<select id="plan-version">${bibleCatalog.filter(bibleAvailable).map(version=>`<option value="${esc(version.name)}" ${state.plan.version===version.name?'selected':''}>${esc(version.name)}${version.online?' · Online':''}</option>`).join('') || '<option value="">Instale uma versão no leitor</option>'}</select></label>
      <label class="field">Marcar progresso por<select id="plan-checklist"><option value="story" ${state.plan.checklist==='story'?'selected':''}>Modo História</option><option value="daily" ${state.plan.checklist==='daily'?'selected':''}>Bloco diário</option><option value="book" ${state.plan.checklist==='book'?'selected':''}>Por livro</option></select><small id="plan-checklist-description" class="field-help">${planChecklistDescription(state.plan.checklist)}</small></label>
      <label class="field" id="plan-book-mode-field" ${state.plan.checklist==='book'?'':'hidden'}>Tipo de marcação<select id="plan-book-mode"><option value="book" ${state.plan.bookCheckMode==='book'?'selected':''}>Um check por livro</option><option value="category" ${state.plan.bookCheckMode==='category'?'selected':''}>Um check por tipo de livro</option></select></label>
      <button class="button button-dark button-full" data-action="generate-plan">${editing?'Salvar alterações':'Criar plano'}</button>
    </aside>
    <section class="plan-form-preview"><span class="panel-label">Resumo do plano</span><h2>${planMethodLabel(state.plan.method)}</h2><dl><div><dt>Duração</dt><dd>${planDurationLabel(state.plan.duration)}</dd></div><div><dt>Progresso</dt><dd>${state.plan.checklist==='story'?'Modo História':state.plan.checklist==='book'?'Livros':'Capítulos'}</dd></div><div class="plan-preview-pace"><dt>Ritmo</dt><dd>${state.plan.checklist==='story'?storyPaceText(state.plan.scope,state.plan.duration,state.plan.method):chapterPaceText(state.plan.scope,state.plan.duration,state.plan.method)}</dd></div></dl></section>
  </div>`;
}

function planChecklistDescription(checklist) {
  if (checklist === 'story') return 'Dia 1: A Criação. Dia 2: A Queda do Homem.';
  if (checklist === 'book') return 'Método sem prazo: dê um check sempre que terminar um livro.';
  return 'Ex.: Gênesis 1–2. Marque cada capítulo; o bloco conclui automaticamente.';
}

function renderPlans() {
  if (!state.plans.length && !planFormOpen) {
    return `<section class="page plans-empty-page">
      ${pageHead('Planos de leitura','Seus planos','')}
      <button class="create-plan-button" data-action="open-plan-form" aria-label="Criar plano de leitura"><span aria-hidden="true">+</span></button>
    </section>`;
  }
  const detailPlan=!planFormOpen?state.plans.find(plan=>plan.id===expandedPlanId):null;
  const currentLabel=planFormOpen?(state.plan.id?`Editar ${state.plan.title}`:'Criar plano'):detailPlan?.title||'';
  const title=planFormOpen?(state.plan.id?'Editar plano':'Criar plano'):detailPlan?.title||'Seus planos';
  const actions=detailPlan
    ? (planManageMode?'<button class="plans-manage-toggle active" data-action="toggle-plan-management">Concluir edição</button>':'')
    : planFormOpen
      ? '<button class="button button-outline plans-new-button" data-action="close-plan-form">Cancelar</button>'
      : `<button class="plans-manage-toggle ${planManageMode?'active':''}" data-action="toggle-plan-management">${planManageMode?'Concluir edição':'Editar planos'}</button><button class="button button-dark plans-new-button" data-action="open-plan-form">+ Novo plano</button>`;
  return `<section class="page plans-page ${planFormOpen?'plan-builder-page':''} ${detailPlan?'plan-detail-page':''}">
    ${(planFormOpen||detailPlan)?renderPlanBreadcrumb(currentLabel):''}
    ${pageHead(detailPlan?'Detalhes do plano':'Planos de leitura',title,'',actions)}
    ${planFormOpen?renderPlanForm():detailPlan?`<div class="reading-plans plan-detail-view">${renderPlanCard(detailPlan,true)}</div>`:`<div class="reading-plans">${state.plans.map(plan=>renderPlanCard(plan)).join('')}</div>`}
  </section>`;
}

function renderStudies() {
  const article = studyArticles.find(item => item.id === activeArticleId);
  if (article) return renderArticle(article);
  const courses=[];
  const data=state.studyTab==='courses'?courses:studyArticles;
  return `<section class="page">
    ${pageHead('Estudos','Estudos','')}
    <div class="content-tabs"><button data-study-tab="articles" class="${state.studyTab==='articles'?'active':''}">Artigos</button><button data-study-tab="courses" class="${state.studyTab==='courses'?'active':''}">Minicursos</button></div>
    <div class="study-grid">${data.length ? data.map(item=>{const progress=state.articleProgress?.[item.id];return `<button class="study-card" data-article-id="${item.id}"><img src="${item.image}" alt="" loading="lazy" /><span class="study-card-copy"><span class="kind">${progress?.complete?'Concluído':progress?.started?'Iniciado':'Artigo'}</span><h3>${item.title}</h3><footer><strong>${item.readTime}</strong></footer></span></button>`;}).join('') : '<div class="empty-state"><h2>Em breve</h2></div>'}</div>
  </section>`;
}

function renderArticle(article) {
  const complete = Boolean(state.articleProgress?.[article.id]?.complete);
  return `<article class="page article-page">
    ${renderBreadcrumb([{label:'Estudos',page:'studies'},{label:'Artigos',action:'close-article'},{label:article.title}])}
    <header class="article-header"><p class="section-kicker">${article.readTime}</p><h1>${article.title}</h1></header>
    <img class="article-hero" src="${article.image}" alt="Ilustração editorial para ${esc(article.title)}" />
    <div class="article-layout"><aside class="article-aside">${article.sections.map((section,index)=>`<a href="#article-section-${index}">${String(index+1).padStart(2,'0')} · ${section[0]}</a>`).join('')}<p>${article.references}</p></aside>
    <div class="article-body"><p class="article-lead">${article.intro}</p>${article.sections.map((section,index)=>`<section id="article-section-${index}"><span>${String(index+1).padStart(2,'0')}</span><h2>${section[0]}</h2><p>${section[1]}</p></section>`).join('')}<blockquote><p>${article.takeaway}</p></blockquote><div class="article-finish"><button class="button ${complete?'button-outline':'button-dark'}" data-action="toggle-article-complete" data-article-id="${article.id}">${complete?'Reabrir':'Concluir'}</button></div></div></div>
  </article>`;
}

function renderMore() {
  const account = accountDetails();
  return `<section class="page more-page">${pageHead('Mais','Mais','')}<div class="more-profile"><span class="avatar">${esc(account.initials)}</span><span><strong>${esc(account.name)}</strong><small>${esc(account.email)}</small></span></div><div class="more-links"><button data-page="studies">Estudos</button><button data-action="toggle-theme">Aparência <small>${state.theme==='dark'?'Escuro':'Claro'}</small></button><button data-action="sign-out">Sair da conta</button></div></section>`;
}

const renderers={home:renderHome,reader:renderReader,'plan-reader':renderReader,plans:renderPlans,studies:renderStudies,more:renderMore};

function readerTextScale() {
  const value = Number(state.readerTextScale);
  return Number.isFinite(value) ? Math.max(.7, Math.min(1.6, Math.round(value * 10) / 10)) : 1;
}

function setReaderTextScale(value, refreshControls = false) {
  state.readerTextScale = Math.max(.7, Math.min(1.6, Math.round(Number(value) * 10) / 10));
  persist();
  document.getElementById('reader-canvas')?.style.setProperty('--reader-text-scale', state.readerTextScale);
  const percentage = Math.round(state.readerTextScale * 100);
  const range = document.getElementById('reader-text-size');
  const output = document.getElementById('reader-text-size-value');
  const toggle = document.querySelector('[data-action="toggle-reader-size-menu"]');
  if (range) range.value = String(percentage);
  if (output) output.textContent = `${percentage}%`;
  if (toggle) {
    toggle.classList.toggle('active', state.readerTextScale !== 1);
    toggle.setAttribute('aria-label', `Tamanho do texto: ${percentage}%`);
  }
  if (refreshControls) updateReaderHeader();
}

function updateReaderHeader() {
  const controls=document.getElementById('reader-header-controls');
  if(!controls)return;
  const readerActive=['reader','plan-reader'].includes(state.page);
  document.body.classList.toggle('reader-open',readerActive);
  if(!readerActive){readerSizeMenuOpen=false;controls.hidden=true;controls.innerHTML='';return;}
  const installedVersions=bibleCatalog.filter(bibleAvailable);
  const currentVersion=installedVersions.find(version=>version.id===state.reader.versionId);
  const scale=readerTextScale();
  const percentage=Math.round(scale*100);
  controls.hidden=false;
  controls.innerHTML=`${currentVersion?`<select id="reader-version" class="reader-version-select" aria-label="Versão da Bíblia" title="Versão da Bíblia">${installedVersions.map(item=>`<option value="${item.id}" ${item.id===currentVersion.id?'selected':''}>${esc(item.abbreviation)}</option>`).join('')}</select>`:''}<button class="icon-button reader-library-button" data-action="open-bible-library" aria-label="Gerenciar versões" title="Gerenciar versões"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4v16H5zM10 4h4v16h-4zM15 5l3.5-1 4 15-3.5 1z"/></svg></button><div class="reader-size-control"><button class="icon-button ${scale!==1?'active':''}" data-action="toggle-reader-size-menu" aria-label="Tamanho do texto: ${percentage}%" title="Tamanho do texto" aria-expanded="${readerSizeMenuOpen}">Aa</button>${readerSizeMenuOpen?`<section class="reader-size-popover" role="dialog" aria-label="Tamanho do texto"><header><strong>Tamanho do texto</strong><output id="reader-text-size-value" for="reader-text-size">${percentage}%</output></header><div class="reader-size-adjust"><button data-action="decrease-reader-size" aria-label="Diminuir texto" title="Diminuir">A−</button><input id="reader-text-size" type="range" min="70" max="160" step="10" value="${percentage}" aria-label="Tamanho do texto em porcentagem" /><button data-action="increase-reader-size" aria-label="Aumentar texto" title="Aumentar">A+</button></div><button class="reader-size-reset" data-action="reset-reader-size" ${scale===1?'disabled':''}>Padrão</button></section>`:''}</div>`;
}

function renderPage(page) {
  if (page === 'planner' || page === 'kids') page = 'home';
  if (page === 'plan-reader' && !planReadingContext()) page = 'plans';
  state.page=page;
  persist();
  const content=document.getElementById('app-content');
  content.innerHTML=(renderers[page]||renderHome)();
  updateReaderHeader();
  content.scrollTop=0;
  const activeNavigationPage = page === 'plan-reader' ? 'plans' : page;
  document.querySelectorAll('[data-page]').forEach(el=>el.classList.toggle('active',el.dataset.page===activeNavigationPage));
  if(['reader','plan-reader'].includes(page)) loadCurrentChapter();
}

function attachVerseHover(){
  document.querySelectorAll('.verse').forEach(v=>{
    v.addEventListener('mouseenter',()=>{const tip=v.querySelector('.verse-comment-tip');if(tip)tip.hidden=false;});
    v.addEventListener('mouseleave',()=>{const tip=v.querySelector('.verse-comment-tip');if(tip)tip.hidden=true;});
  });
}

function showVerseMenu(verseEl, verseNumber){
  document.querySelector('.verse-action-menu')?.remove();
  const rect=verseEl.getBoundingClientRect();
  const menu=document.createElement('div');
  menu.className='verse-action-menu';
  menu.style.left=`${Math.max(12,Math.min(window.innerWidth-410,rect.left))}px`;
  menu.style.top=`${Math.max(78,rect.top-48)}px`;
  menu.innerHTML=`<button data-verse-action="comment" data-number="${verseNumber}">Comentar</button><button data-verse-action="favorite" data-number="${verseNumber}">Favoritar</button><button data-verse-action="copy" data-number="${verseNumber}">Copiar</button><div class="color-dots"><button class="color-dot yellow" data-highlight="yellow" data-number="${verseNumber}" aria-label="Grifo amarelo" title="Amarelo"></button><button class="color-dot green" data-highlight="green" data-number="${verseNumber}" aria-label="Grifo verde" title="Verde"></button><button class="color-dot blue" data-highlight="blue" data-number="${verseNumber}" aria-label="Grifo azul" title="Azul"></button><button class="color-dot rose" data-highlight="rose" data-number="${verseNumber}" aria-label="Grifo rosa" title="Rosa"></button><button class="color-dot no-highlight" data-highlight="none" data-number="${verseNumber}" aria-label="Remover grifo" title="Sem grifo"></button></div>`;
  document.body.appendChild(menu);
}

function renderCommentComposer(version, book) {
  if (!commentComposerOpen || !commentComposerVerse) return '';
  const key = currentVerseKey(commentComposerVerse);
  const existing = state.comments[key] || '';
  const verse = activeChapter?.verses.find(item => item.number === commentComposerVerse);
  return `<div class="comment-composer-backdrop" data-comment-backdrop>
    <section class="comment-composer" role="dialog" aria-modal="true" aria-labelledby="comment-composer-title">
      <button class="icon-button modal-close" data-action="close-comment-composer" aria-label="Fechar">×</button>
      <div class="comment-composer-head">
        <p class="section-kicker">Comentário do versículo</p>
        <h2 id="comment-composer-title">${esc(book.name)} ${state.reader.chapter}:${commentComposerVerse}</h2>
        <p>${esc(version.abbreviation)} · ${verse ? esc(verse.text) : 'Registre o que essa passagem despertou em você.'}</p>
      </div>
      <label class="field comment-field">Seu comentário
        <textarea id="comment-composer-body" maxlength="220" placeholder="Escreva uma observação, aplicação ou oração curta...">${esc(existing)}</textarea>
      </label>
      <div class="comment-composer-foot">
        <small><span id="comment-composer-count">${existing.length}</span>/220</small>
        <div class="comment-composer-actions">
          ${existing ? '<button class="button button-outline" data-action="delete-comment">Remover</button>' : ''}
          <button class="button button-outline" data-action="close-comment-composer">Cancelar</button>
          <button class="button button-dark" data-action="save-comment">Salvar comentário</button>
        </div>
      </div>
    </section>
  </div>`;
}

function openCommentComposer(number){
  commentComposerVerse = number;
  commentComposerOpen = true;
  document.body.classList.add('comment-composer-open');
  document.querySelector('.verse-action-menu')?.remove();
  const version = bibleCatalog.find(item => item.id === state.reader.versionId);
  const book = version?.books.find(item => item.code === state.reader.bookCode);
  if (!version || !book) return;
  document.querySelector('.reader-main')?.insertAdjacentHTML('beforeend', renderCommentComposer(version, book));
  requestAnimationFrame(() => document.getElementById('comment-composer-body')?.focus({ preventScroll: true }));
}

function clearCommentVerseSelection() {
  state.reader.verse = '';
  state.selectedVerse = null;
  document.querySelector('.verse.verse-focused')?.classList.remove('verse-focused');
  const verseSelect = document.getElementById('reader-verse');
  if (verseSelect) verseSelect.value = '';
}

function closeCommentComposer() {
  commentComposerOpen = false;
  commentComposerVerse = null;
  clearCommentVerseSelection();
  document.body.classList.remove('comment-composer-open');
  document.querySelector('.comment-composer-backdrop')?.remove();
  persist();
}

function updateVisibleComment(number, text) {
  const verse = document.querySelector(`.verse[data-verse="${number}"]`);
  if (!verse) return;
  verse.classList.toggle('has-comment', Boolean(text));
  verse.querySelector('.verse-comment-tip')?.remove();
  if (text) verse.insertAdjacentHTML('beforeend', `<span class="verse-comment-tip" hidden>${esc(text)}</span>`);
}

function saveCommentComposer() {
  if (!commentComposerVerse) return;
  const number = commentComposerVerse;
  const key = currentVerseKey(number);
  const text = document.getElementById('comment-composer-body')?.value.trim().slice(0, 220) || '';
  if (text) state.comments[key] = text;
  else delete state.comments[key];
  updateVisibleComment(number, text);
  closeCommentComposer();
  persist();
  toast(text ? 'Comentário ligado ao versículo.' : 'Comentário removido.');
}

function deleteCommentComposer() {
  if (!commentComposerVerse) return;
  const number = commentComposerVerse;
  delete state.comments[currentVerseKey(number)];
  updateVisibleComment(number, '');
  closeCommentComposer();
  persist();
  toast('Comentário removido.');
}

function updatePlanFields(){
  const title=document.getElementById('plan-title');
  const scope=document.getElementById('plan-scope');
  const duration=document.getElementById('plan-duration');
  const version=document.getElementById('plan-version');
  const checklist=document.getElementById('plan-checklist');
  const bookMode=document.getElementById('plan-book-mode');
  if(title)state.plan.title=title.value;
  if(scope)state.plan.scope=scope.value;
  if(duration)state.plan.duration=duration.value;
  if(version)state.plan.version=version.value;
  if(checklist)state.plan.checklist=checklist.value;
  if(bookMode)state.plan.bookCheckMode=bookMode.value;
  if(state.plan.checklist==='book')state.plan.duration='custom';
  persist();
}

function updatePlanFormPreview() {
  const preview=document.querySelector('.plan-form-preview');
  if (!preview) return;
  preview.querySelector('h2').textContent=planMethodLabel(state.plan.method);
  const values=preview.querySelectorAll('dd');
  if(values[0])values[0].textContent=state.plan.checklist==='book'?'Sem prazo':planDurationLabel(state.plan.duration);
  if(values[1])values[1].textContent=state.plan.checklist==='story'?'Modo História':state.plan.checklist==='book'?'Livros':'Capítulos por dia';
  if(values[2])values[2].textContent=state.plan.checklist==='story'?storyPaceText(state.plan.scope,state.plan.duration,state.plan.method):chapterPaceText(state.plan.scope,state.plan.duration,state.plan.method);
  const description=document.getElementById('plan-checklist-description');
  if(description)description.textContent=planChecklistDescription(state.plan.checklist);
}

function togglePlanItem(planId, itemId) {
  const plan=state.plans.find(item=>item.id===planId);
  if(!plan)return false;
  const completed=new Set(plan.completedItemIds||[]);
  const complete=!completed.has(itemId);
  if(complete)completed.add(itemId);else completed.delete(itemId);
  plan.completedItemIds=[...completed];
  persist();
  return complete;
}

function togglePlanChapter(planId, chapterId) {
  const plan = state.plans.find(item => item.id === planId);
  if (!plan || !chapterFromId(chapterId)) return false;
  const completed = new Set(plan.completedChapterIds || []);
  const complete = !completed.has(chapterId);
  if (complete) completed.add(chapterId); else completed.delete(chapterId);
  plan.completedChapterIds = [...completed];
  persist();
  return complete;
}

function refreshPlanCard(planId) {
  const plan = state.plans.find(item => item.id === planId);
  const card = document.querySelector(`[data-plan-card="${planId}"]`);
  if (plan && card) card.outerHTML = renderPlanCard(plan);
}

function updatePlanProgressUI(planId, itemId, complete) {
  const plan=state.plans.find(item=>item.id===planId);
  const card=document.querySelector(`[data-plan-card="${planId}"]`);
  if(!plan||!card)return;
  card.querySelectorAll(`[data-plan-progress-item="${CSS.escape(itemId)}"]`).forEach(button=>{
    button.classList.toggle('complete',complete);
    button.setAttribute('aria-pressed',String(complete));
    const check=button.querySelector('.milestone-check');
    if(check)check.textContent=complete?'✓':'○';
    const storyRow=button.closest('.story-reading-row');
    if(storyRow){storyRow.classList.toggle('complete',complete);const readButton=storyRow.querySelector('[data-action="start-story-reading"]');if(readButton)readButton.textContent=complete?'Reler':'Ler';}
  });
  if(itemId.startsWith('story-')){
    const dayIndex=(plan.days||[]).findIndex(day=>(day.storyIds||[]).includes(itemId));
    const day=plan.days[dayIndex];
    const dot=card.querySelector(`.plan-day-dot[data-plan-day="${dayIndex}"]`);
    if(day&&dot){
      const dayState=storyDayState(plan,day);
      const readingWeight=day.readingWeight||(day.storyIds||[]).map(storyFromId).filter(Boolean).reduce((total,story)=>total+storyReadingWeight(story),0);
      dot.classList.toggle('complete',dayState.complete);
      dot.classList.toggle('partial',dayState.partial);
      dot.setAttribute('title',`Dia ${dayIndex+1} · ${dayState.total} histórias · ${readingWeight} capítulos`);
      dot.setAttribute('aria-label',`Abrir dia ${dayIndex+1}: ${dayState.done} de ${dayState.total} histórias concluídas; ${readingWeight} capítulos previstos`);
      const detailCount=card.querySelector('.story-day-detail .day-detail-head small');
      if(detailCount&&selectedPlanDay?.planId===planId&&selectedPlanDay.index===dayIndex)detailCount.textContent=`${dayState.done} de ${dayState.total} concluídas`;
    }
    const resume=card.querySelector('.story-resume-slot');
    if(resume)resume.innerHTML=renderStoryResume(plan);
  }
  const progress=planProgress(plan);
  const value=card.querySelector('.plan-progress-value');
  const count=card.querySelector('.plan-progress-count');
  const fill=card.querySelector('.plan-progress-fill');
  if(value)value.textContent=`${progress.percent}%`;
  if(count)count.textContent=`${progress.done}/${progress.total} concluídos`;
  if(fill)fill.style.width=`${progress.percent}%`;
  const headProgress=card.querySelector('.plan-card-progress');
  if(headProgress)headProgress.textContent=`${progress.percent}%`;
}

function openPlanDay(planId, index) {
  const plan=state.plans.find(item=>item.id===planId);
  const card=document.querySelector(`[data-plan-card="${planId}"]`);
  if(!plan||!card||!plan.days[index])return;
  selectedPlanDay={planId,index};
  card.querySelectorAll('.plan-day-dot[data-plan-day]').forEach(button=>button.classList.toggle('selected',Number(button.dataset.planDay)===index));
  const daySelect=card.querySelector('[data-plan-day-select]');
  if(daySelect)daySelect.value=String(index);
  const detail=card.querySelector('[data-plan-day-detail]');
  if(detail)detail.innerHTML=plan.checklist==='story'?renderStoryDayDetail(plan,plan.days[index],index):renderPlanDayDetail(plan,plan.days[index],index);
}

function editPlan(planId) {
  const plan=state.plans.find(item=>item.id===planId);
  if(!plan)return;
  state.plan={...structuredClone(defaultState.plan),...structuredClone(plan),days:[]};
  planFormOpen=true;
  expandedPlanId=null;
  selectedPlanDay=null;
  renderPage('plans');
}

function deletePlan(planId) {
  const plan=state.plans.find(item=>item.id===planId);
  if(!plan)return;
  state.plans=state.plans.filter(item=>item.id!==planId);
  if(expandedPlanId===planId)expandedPlanId=null;
  if(state.planReading?.planId===planId)state.planReading=null;
  persist();
  renderPage('plans');
  toast('Plano excluído.');
}

function armPlanDeletion(button) {
  button.dataset.action='confirm-delete-plan';
  button.classList.add('confirm-delete');
  button.textContent='Excluir?';
  button.setAttribute('aria-label','Confirmar exclusão do plano');
  button.setAttribute('title','Clique novamente para excluir');
  clearTimeout(armPlanDeletion.timer);
  armPlanDeletion.timer=setTimeout(()=>{
    if(!button.isConnected)return;
    button.dataset.action='delete-plan';
    button.classList.remove('confirm-delete');
    button.textContent='Excluir';
    button.setAttribute('aria-label','Excluir plano');
    button.setAttribute('title','Excluir plano');
  },5000);
}

document.addEventListener('click', e=>{
  if(e.target.matches('[data-comment-backdrop]')){closeCommentComposer();return;}
  if(readerSizeMenuOpen && !e.target.closest('.reader-size-control')){readerSizeMenuOpen=false;updateReaderHeader();}
  const open=e.target.closest('[data-action="open-login"]');
  if(open){window.deeperAuth?.open('sign-in');return;}
  if(e.target.closest('[data-action="open-signup"]')){window.deeperAuth?.open('sign-up');return;}
  const authView=e.target.closest('[data-auth-view]');
  if(authView){window.deeperAuth?.switchView(authView.dataset.authView);return;}
  if(e.target.closest('[data-action="close-login"]')){window.deeperAuth?.close();return;}
  if(e.target.closest('[data-action="toggle-account-menu"]')){
    const menu=document.getElementById('account-menu');
    menu.hidden=!menu.hidden;
    e.target.closest('[data-action="toggle-account-menu"]').setAttribute('aria-expanded',String(!menu.hidden));
    return;
  }
  if(e.target.closest('[data-action="scroll-features"]')){document.getElementById('recursos').scrollIntoView({behavior:'smooth'});return;}
  const pageLink=e.target.closest('[data-page]');
  if(pageLink && !document.getElementById('app').hidden){
    e.preventDefault();
    if(pageLink.dataset.page==='studies')activeArticleId=null;
    if(pageLink.dataset.page==='reader'){
      state.planReading=null;
      expandedPlanId=null;
      selectedPlanDay=null;
      planFormOpen=false;
    }
    if(pageLink.dataset.page==='plans'){expandedPlanId=null;selectedPlanDay=null;planFormOpen=false;planManageMode=false;}
    renderPage(pageLink.dataset.page);
    return;
  }
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='sign-out'){document.getElementById('account-menu').hidden=true;window.deeperAuth?.signOut();return;}
  if(action==='toggle-reader-size-menu'){readerSizeMenuOpen=!readerSizeMenuOpen;updateReaderHeader();return;}
  if(action==='decrease-reader-size'){setReaderTextScale(readerTextScale()-.1,true);return;}
  if(action==='increase-reader-size'){setReaderTextScale(readerTextScale()+.1,true);return;}
  if(action==='reset-reader-size'){setReaderTextScale(1,true);return;}
  if(action==='toggle-theme'){setTheme(state.theme==='light'?'dark':'light');toast(`Modo ${state.theme==='dark'?'escuro':'claro'} ativado.`);return;}
  if(action==='open-bible-library'){bibleLibraryOpen=true;renderPage(state.page==='plan-reader'?'plan-reader':'reader');return;}
  if(action==='close-bible-library'){bibleLibraryOpen=false;renderPage(state.page==='plan-reader'?'plan-reader':'reader');return;}
  if(action==='previous-reader-chapter' || action==='next-reader-chapter'){
    const currentVersion=bibleCatalog.find(item=>item.id===state.reader.versionId);
    const currentBookIndex=currentVersion?.books.findIndex(item=>item.code===state.reader.bookCode) ?? -1;
    if(currentBookIndex<0)return;
    const direction=action==='next-reader-chapter'?1:-1;
    let nextBook=currentVersion.books[currentBookIndex];
    let nextChapter=state.reader.chapter+direction;
    if(nextChapter<1 && currentBookIndex>0){nextBook=currentVersion.books[currentBookIndex-1];nextChapter=nextBook.chapters;}
    if(nextChapter>nextBook.chapters && currentBookIndex<currentVersion.books.length-1){nextBook=currentVersion.books[currentBookIndex+1];nextChapter=1;}
    if(nextChapter<1 || nextChapter>nextBook.chapters)return;
    const targetPage=state.page==='plan-reader'?'plan-reader':'reader';
    state.reader.bookCode=nextBook.code;state.reader.chapter=nextChapter;state.reader.verse='';state.selectedVerse=null;persist();renderPage(targetPage);return;
  }
  if(action==='close-comment-composer'){closeCommentComposer();return;}
  if(action==='open-plan-form'){resetPlanDraft();planFormOpen=true;renderPage('plans');return;}
  if(action==='close-plan-form'){resetPlanDraft();planFormOpen=false;renderPage('plans');return;}
  if(action==='plans-list'){expandedPlanId=null;selectedPlanDay=null;planFormOpen=false;resetPlanDraft();renderPage('plans');return;}
  if(action==='toggle-plan-management'){planManageMode=!planManageMode;renderPage('plans');return;}
  if(action==='toggle-plan'){
    const planId=e.target.closest('[data-plan-id]').dataset.planId;
    expandedPlanId=planId;
    selectedPlanDay=null;
    renderPage('plans');
    return;
  }
  if(action==='edit-plan'){editPlan(e.target.closest('[data-plan-id]').dataset.planId);return;}
  if(action==='delete-plan'){armPlanDeletion(e.target.closest('[data-action="delete-plan"]'));return;}
  if(action==='confirm-delete-plan'){deletePlan(e.target.closest('[data-plan-id]').dataset.planId);return;}
  if(action==='save-comment'){saveCommentComposer();return;}
  if(action==='delete-comment'){deleteCommentComposer();return;}
  const verse=e.target.closest('.verse');
  if(verse && !e.target.closest('.verse-comment-tip')){state.selectedVerse=Number(verse.dataset.verse);state.reader.verse=String(verse.dataset.verse);persist();updateVerseSelect();showVerseMenu(verse,state.selectedVerse);return;}
  const highlight=e.target.closest('[data-highlight]');
  if(highlight){
    const number=highlight.dataset.number,key=currentVerseKey(number),color=highlight.dataset.highlight,isSelected=state.highlights[key]===color;
    const remove=color==='none'||isSelected;
    if(remove)delete state.highlights[key];else state.highlights[key]=color;
    persist();
    const verseElement=document.querySelector(`.verse[data-verse="${number}"]`);
    if(verseElement){verseElement.classList.remove('highlight-yellow','highlight-green','highlight-blue','highlight-rose');if(!remove)verseElement.classList.add(`highlight-${color}`);}
    document.querySelector('.verse-action-menu')?.remove();
    toast(remove?'Grifo removido.':'Versículo grifado.');return;
  }
  const verseAction=e.target.closest('[data-verse-action]');
  if(verseAction){const n=Number(verseAction.dataset.number);const type=verseAction.dataset.verseAction;
    if(type==='comment')openCommentComposer(n);
    if(type==='favorite'){const key=currentVerseKey(n);if(!state.favorites.includes(key))state.favorites.push(key);persist();toast('Versículo adicionado aos favoritos.');}
    if(type==='copy'){const verse=activeChapter?.verses.find(item=>item.number===n);navigator.clipboard?.writeText(`${n} ${verse?.text||''}`);toast('Versículo copiado.');}
    return;
  }
  const installBible=e.target.closest('[data-install-bible]');
  if(installBible){installBibleVersion(installBible.dataset.installBible,installBible);return;}
  const removeBible=e.target.closest('[data-remove-bible]');
  if(removeBible){removeBibleVersion(removeBible.dataset.removeBible);return;}
  const readerBook=e.target.closest('[data-reader-book]');
  if(readerBook && state.page==='reader'){state.reader.bookCode=readerBook.dataset.readerBook;state.reader.chapter=1;state.reader.verse='';state.selectedVerse=null;persist();renderPage('reader');return;}
  const method=e.target.closest('[data-plan-field="method"] button');
  if(method){
    state.plan.method=method.dataset.value;
    persist();
    method.parentElement.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button===method));
    const description=document.getElementById('plan-method-description');
    if(description)description.textContent=state.plan.method==='chronological'?'Ordem dos acontecimentos definida para a leitura cronológica.':'Ordem tradicional dos livros da Bíblia.';
    updatePlanFormPreview();
    return;
  }
  if(action==='generate-plan'){updatePlanFields();planFormOpen=false;generatePlan();return;}
  if(action==='start-plan-reading'){
    const target=e.target.closest('[data-plan-id]');
    const rawIndex=target?.dataset.planDayIndex;
    startPlanReading(target?.dataset.planId,{dayIndex:rawIndex===undefined?undefined:Number(rawIndex)});
    return;
  }
  if(action==='start-story-reading'){
    const target=e.target.closest('[data-plan-id]');
    startPlanReading(target?.dataset.planId,{storyId:target?.dataset.storyId});
    return;
  }
  if(action==='start-plan-group-reading'){
    const target=e.target.closest('[data-plan-id]');
    startPlanReading(target?.dataset.planId,{groupId:target?.dataset.planGroup});
    return;
  }
  if(action==='resume-plan-reading'){resumePlanReading();return;}
  if(action==='back-to-plan'){backToActivePlan();return;}
  if(action==='complete-plan-reading-chapter'){completePlanReadingChapter();return;}
  if(action==='continue-plan-reading'){continuePlanReading();return;}
  if(action==='finish-plan-reading-stage'){finishPlanReadingStage();return;}
  if(action==='exit-plan-reading'){state.planReading=null;persist();renderPage('reader');return;}
  const planDay=e.target.closest('[data-plan-day]');
  if(planDay){openPlanDay(planDay.dataset.planId,Number(planDay.dataset.planDay));return;}
  if(action==='close-day-detail'){
    const card=e.target.closest('[data-plan-card]');
    card?.querySelectorAll('[data-plan-day]').forEach(button=>button.classList.remove('selected'));
    const daySelect=card?.querySelector('[data-plan-day-select]');if(daySelect)daySelect.value='';
    const detail=card?.querySelector('[data-plan-day-detail]');if(detail)detail.innerHTML='';
    selectedPlanDay=null;return;
  }
  const chapterProgress=e.target.closest('[data-plan-chapter]');
  if(chapterProgress){const complete=togglePlanChapter(chapterProgress.dataset.planId,chapterProgress.dataset.planChapter);refreshPlanCard(chapterProgress.dataset.planId);toast(complete?'Capítulo concluído.':'Capítulo reaberto.');return;}
  const progressItem=e.target.closest('[data-plan-progress-item]');
  if(progressItem){const complete=togglePlanItem(progressItem.dataset.planId,progressItem.dataset.planProgressItem);updatePlanProgressUI(progressItem.dataset.planId,progressItem.dataset.planProgressItem,complete);toast(complete?'Etapa concluída.':'Etapa reaberta.');return;}
  const tab=e.target.closest('[data-study-tab]');if(tab){state.studyTab=tab.dataset.studyTab;activeArticleId=null;persist();renderPage('studies');return;}
  const articleCard=e.target.closest('[data-article-id]');
  if(articleCard && !articleCard.dataset.action){activeArticleId=articleCard.dataset.articleId;state.articleProgress[activeArticleId]={...(state.articleProgress[activeArticleId]||{}),started:true};persist();renderPage('studies');return;}
  if(action==='close-article'){activeArticleId=null;renderPage('studies');return;}
  if(action==='toggle-article-complete'){const id=e.target.closest('[data-article-id]').dataset.articleId;const current=state.articleProgress[id]||{};state.articleProgress[id]={started:true,complete:!current.complete};persist();renderPage('studies');toast(state.articleProgress[id].complete?'Artigo concluído.':'Artigo reaberto.');return;}
  if(!e.target.closest('.account-control'))document.getElementById('account-menu').hidden=true;
  if(!e.target.closest('.verse-action-menu'))document.querySelector('.verse-action-menu')?.remove();
});

document.addEventListener('change', e=>{
  const daySelect=e.target.closest('[data-plan-day-select]');
  if(daySelect){if(daySelect.value!=='')openPlanDay(daySelect.dataset.planId,Number(daySelect.value));return;}
  if(['plan-scope','plan-duration','plan-version','plan-checklist','plan-book-mode'].includes(e.target.id)){
    updatePlanFields();
    if(e.target.id==='plan-checklist'){
      const bookField=document.getElementById('plan-book-mode-field');
      if(bookField)bookField.hidden=state.plan.checklist!=='book';
      const durationField=document.getElementById('plan-duration-field');
      if(durationField)durationField.hidden=state.plan.checklist==='book';
      if(state.plan.checklist==='book'){
        state.plan.duration='custom';
        const duration=document.getElementById('plan-duration');
        if(duration)duration.value='custom';
        persist();
      }
    }
    updatePlanFormPreview();
  }
  if(e.target.id==='reader-version'){
    if(!['reader','plan-reader'].includes(state.page))return;
    const version=bibleCatalog.find(item=>item.id===e.target.value);
    const currentBook=version.books.find(item=>item.code===state.reader.bookCode)||version.books[0];
    state.reader={versionId:e.target.value,bookCode:currentBook.code,chapter:Math.min(Number(state.reader.chapter)||1,currentBook.chapters),verse:''};state.selectedVerse=null;persist();renderPage(state.page);return;
  }
  if(e.target.id==='reader-book' && state.page==='reader'){state.reader.bookCode=e.target.value;state.reader.chapter=1;state.reader.verse='';state.selectedVerse=null;persist();renderPage('reader');return;}
  if(e.target.id==='reader-chapter' && state.page==='reader'){state.reader.chapter=Number(e.target.value);state.reader.verse='';state.selectedVerse=null;persist();renderPage('reader');return;}
  if(e.target.id==='reader-verse' && state.page==='reader'){state.reader.verse=e.target.value;state.selectedVerse=e.target.value?Number(e.target.value):null;persist();renderPage('reader');}
});

document.addEventListener('input',e=>{
  if(e.target.id==='reader-text-size'){setReaderTextScale(Number(e.target.value)/100);return;}
  if(e.target.id==='plan-title'){state.plan.title=e.target.value;persist();}
  if(e.target.id==='comment-composer-body'){
    const count = document.getElementById('comment-composer-count');
    if (count) count.textContent = String(e.target.value.length);
  }
});

window.addEventListener('deeper-auth-ready', event=>{
  if(event.detail.user)activateAccount(event.detail.user);
  else deactivateAccount();
});
window.addEventListener('deeper-auth-change', event=>{
  if(event.detail.user)activateAccount(event.detail.user);
  else deactivateAccount();
});
window.addEventListener('deeper-sync-error', ()=>toast('Não foi possível sincronizar agora. Seus dados continuam salvos neste dispositivo.'));

document.addEventListener('keydown',e=>{if(e.key==='Escape'){window.deeperAuth?.close();document.getElementById('account-menu').hidden=true;document.querySelector('.verse-action-menu')?.remove();searchPanel?.remove();if(readerSizeMenuOpen){readerSizeMenuOpen=false;updateReaderHeader();}if(commentComposerOpen)closeCommentComposer();}});

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}

showLanding();
initializeBibleLibrary();
initializeBibleStories();
initializeChronologicalPlan();
