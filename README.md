# Site ATLAS Gestão Empresarial Inteligente

Site estático em HTML, CSS e JavaScript, pensado para hospedagem compartilhada da Hostinger.

## Estrutura

- `index.html`: página inicial
- `sobre.html`: apresentação institucional
- `planos.html`: modalidades mensais sem preços
- `servicos/`: catálogo e páginas individuais dos nove serviços
- `contato.html`: formulário que prepara a solicitação no WhatsApp
- `assets/`: identidade visual, estilos e interações

## Publicação na Hostinger

Envie o conteúdo da pasta `atlas-site` (ou os arquivos desta pasta no GitHub) para a pasta do domínio/subdomínio desejado em `public_html`. A página inicial é `index.html`; não há build nem banco de dados.

## Configurar o contato

Antes de publicar, abra `assets/main.js` e preencha a variável `number` com o WhatsApp comercial da ATLAS, somente com DDI e DDD e sem `+`, espaços ou pontuação (por exemplo, `5511999999999`). Até essa configuração, o link abre o WhatsApp com o texto preparado para a pessoa escolher para quem enviar.

Os valores comerciais do PDF de referência não foram publicados no site; os planos apresentam somente escopo e capacidade.
