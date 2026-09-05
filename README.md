# Deeper

Plataforma web de leitura e estudo bíblico com instalação de traduções para uso offline.

## Funcionalidades atuais

- Login administrativo local (`admin` / `admin`).
- Primeiro uso sem planos, notas, marcações ou conteúdo pessoal.
- Leitor real com seis traduções abertas em português, três delas selecionadas para instalação automática.
- Catálogo para baixar e remover traduções.
- Pacotes gzip verificados por SHA-256 antes da instalação.
- Capítulos armazenados em IndexedDB para leitura offline.
- Seleção de tradução, livro e capítulo.
- Créditos e licença exibidos em cada tradução.
- Grifos, comentários, favoritos e cópia de versículos.
- Gerador de múltiplos planos canônicos e cronológicos, com duração de um mês a um ano ou ritmo livre.
- Progresso por Modo História, blocos diários, livros ou tipos de livros.
- Catálogo oficial com 486 histórias organizadas em 56 grupos, distribuídas automaticamente conforme o prazo escolhido.
- Retomada persistente da próxima história ainda não lida, com marcação individual e progresso diário parcial ou completo.
- Ordem cronológica completa de 1.189 capítulos, baseada no plano público de 365 dias da Blue Letter Bible.
- Leitura iniciada dentro do plano, com check por capítulo, avanço contínuo e conclusão automática do bloco, livro ou categoria.
- Dashboard geral em grade de pontos, com edição, exclusão e planos recolhidos.
- PostgreSQL com 109.168 registros bíblicos e busca textual em português.
- Estrutura Supabase multi-tenant com RLS.

## Seleção de três Bíblias completas em português

Almeida 1911 (AL1911), Bíblia Livre (BLIVRE) e Biblica Open Nova Bíblia Viva (ONBV) são preparadas automaticamente para leitura offline na primeira abertura com conexão. Cada uma contém 66 livros e 1.189 capítulos. Uma remoção posterior pelo usuário é respeitada.

A Almeida 1911 preserva a grafia histórica da digitalização na pasta `original` de [BibliaJFAAL/JFAAL](https://github.com/BibliaJFAAL/JFAAL/tree/main/original); não usa a revisão por IA daquele projeto. A Bíblia Livre é uma atualização de Almeida de 1819, edição Textus Receptus, cujo editor informa ser um trabalho em andamento. A Nova Bíblia Viva tem linguagem mais livre e foi selecionada para comparação, não como equivalente literal à King James. Não existe garantia de ausência de erros de tradução ou digitalização.

O importador verifica livros, capítulos, referências duplicadas e textos vazios nas três selecionadas. Os hashes verificam a integridade dos pacotes, não a exatidão teológica da tradução. Os CSVs gerados incluem seis versões; a atualização do PostgreSQL é um procedimento separado da instalação offline do leitor.

## Traduções

### NVI, NVT, ACF e documento judaico pessoal

O servidor Node (`npm start`) fornece NVI, NVT e ACF (também citada no exemplo de API) por consulta online à ABíbliaDigital, em `/api/bible/{nvi|nvt|acf}/{codigoLivro}/{capitulo}`. Elas aparecem automaticamente no seletor e nos planos. O conteúdo é consultado por capítulo, sem pacote integral e sem cache persistente; requer internet e disponibilidade do fornecedor. A disponibilidade técnica da API não comprova licença para redistribuição integral. Uma hospedagem somente estática não executa essa integração.

O PDF enviado pelo usuário está em `private/novo-testamento-judaico.pdf`, fora dos arquivos públicos e ignorado pelo Git. O atalho em Gerenciar versões abre `/api/bible/personal.pdf` somente para conexões locais (loopback). Trata-se do Novo Testamento Judaico de David H. Stern, digitalizado em 170 páginas, não da Bíblia Judaica Completa nem de um pacote de versículos. Não publicar a pasta `private` nem colocar esta rota atrás de um proxy público que se conecte por loopback.

KJA/KJF em português aparecem como pendentes na biblioteca: a BIBLIAAPI exige uma chave; não estão instaladas, e nenhuma chave deve ser inserida no JavaScript público.

| Sigla | Tradução | Conteúdo | Licença |
|---|---|---|---|
| AL1911 | Almeida 1911 | Bíblia completa | Domínio público (texto de 1911) |
| BLIVRE | Bíblia Livre | Bíblia completa | CC BY 4.0 |
| BPM | Bíblia Portuguesa Mundial | Bíblia completa | Domínio público |
| ONBV | Biblica Open Nova Bíblia Viva 2007 | Bíblia completa | CC BY-SA 4.0 |
| T4T | Tradução para Tradutores | Novo Testamento | CC BY-SA 4.0 |
| BLT | Bíblia Livre Para Todos | Novo Testamento | CC BY-SA 4.0 |

Os avisos completos, links das fontes e hashes estão em `data/bibles/catalog.json`.

O método cronológico usa como referência o [1-Year Chronological Plan da Blue Letter Bible](https://www.blueletterbible.org/assets-v3/pdf/dbrp/1Yr_ChronologicalPlan.pdf). A duração escolhida apenas combina essas unidades em mais ou menos leituras diárias, preservando a sequência das passagens.

## Executar

Versão pública: [silvamarcus.github.io/deeper](https://silvamarcus.github.io/deeper/)

A aplicação não depende de npm:

```powershell
node server.mjs
```

Abra `http://deeperai.localhost:8080`.

No celular conectado à mesma rede Wi-Fi, acesse `http://IP-LOCAL-DO-COMPUTADOR:8080` (nesta máquina, `http://192.168.0.13:8080`). Se o Windows solicitar, permita o Node.js somente em redes privadas.

## Servidor local Deeper

O servidor local e identificado como **Deeper** e inicia automaticamente no login do Windows pela tarefa agendada `Deeper Local Server`. O script [start-deeper.ps1](start-deeper.ps1) evita abrir uma segunda instancia quando a porta `8080` ja estiver em uso.

Para iniciar manualmente, use:

```powershell
npm start
```

O servidor expõe somente os arquivos públicos necessários e bloqueia `.env`, scripts e arquivos de importação.

## Atualizar as Bíblias

```powershell
powershell -ExecutionPolicy Bypass -File scripts/download-bible-sources.ps1
node scripts/import-bibles.mjs
powershell -ExecutionPolicy Bypass -File scripts/load-bibles-local.ps1
```

O primeiro script baixa os pacotes VPL oficiais do eBible e a digitalização histórica da Almeida 1911. O segundo valida e gera o catálogo, os pacotes offline e os CSVs privados. O terceiro aplica o esquema e recarrega o PostgreSQL local (atenção: esse script preexistente trunca tabelas com cascade; não é necessário para o leitor offline).

## Arquivos principais

- `app.js`: navegação, instalação offline e leitor.
- `data/bibles/`: catálogo público e pacotes gzip.
- `data/bible-stories.json`: catálogo estruturado dos planos no Modo História.
- `data/chronological-plan.json`: sequência validada de 365 unidades e 1.189 capítulos cronológicos.
- `scripts/import-bibles.mjs`: importador e validador.
- `scripts/import-chronological-plan.py`: extrator e validador da fonte cronológica.
- `supabase/bible-schema.sql`: versões, versículos, busca e instalações por usuário.
- `supabase/schema.sql`: estrutura multi-tenant principal.
- `server.mjs`: servidor HTTP local com lista segura de arquivos públicos.

## Antes da produção

1. Criar o projeto Supabase de produção e preencher `.env`.
2. Enviar os pacotes de `data/bibles` ao Supabase Storage público.
3. Executar os dois esquemas e importar os CSVs no PostgreSQL da nuvem.
4. Substituir a validação local do login pelo Supabase Auth.
5. Sincronizar planos, notas e marcações com o banco.
6. Adicionar versões protegidas somente após contrato de licenciamento.
7. Executar testes de segurança, acessibilidade, carga e recuperação.
