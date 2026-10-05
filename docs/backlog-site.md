# Backlog do site (apps/web)

Itens combinados que dependem de material ou decisão. Remova o item quando entrar no ar.

## Esperando material

- **Tela do Terus Order no card de módulos.** O Order é o único módulo essencial sem tela
  do portal. Precisa da tela de pedidos/sugestão de compra no ambiente de demonstração com
  dados (não vazia). Com o print ou o acesso, entra em `PLATFORM_SCREENS` (lib/constants/lp.ts)
  e em `screen` do módulo `order` (lib/constants/modules.ts).
- **Vídeo demo do produto.** A seção `ProductDemoSection` está pronta e oculta na home.
  Precisa de uma gravação de tela de 30 a 60 s do portal e do app (alerta → tarefa na loja →
  resultado). Arquivo em `public/videos/` e `PRODUCT_DEMO.src` em lib/constants/site-data.ts.
- **Telas do Terus Task em alta resolução.** As artes atuais vieram do WhatsApp (472 px de
  largura). Trocar em `public/app-task/` pelos originais quando chegarem.

## Esperando decisão

- **Endereço do pré-cadastro.** Hoje em `/solicitar-demo`. Proposta: `/comecar`, com
  redirecionamento permanente do endereço antigo. Rota nova precisa de aprovação.
## Fora do site (time de produto)

- Portal escreve "Godula" em vez de "Gôndola".
- Saúde da Integração fica em "Calculando" no ambiente de demonstração.
- Onboarding self-service: falta backend (API e Vault) para ligar em produção.
