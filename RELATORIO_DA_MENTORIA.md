# 🚀 AlphaFlow - Manual do Projeto e Relatório de Melhorias

Este documento guarda o histórico de todas as otimizações e implementações de nível sênior que fizemos no seu projeto hoje. Guarde-o para consultas futuras sobre como atualizar o seu site!

---

## 🛠️ O que foi implementado na Loja:

### 1. Sistema Real de Contas e Restrição
A aba "Minha Conta" deixou de ser apenas visual e agora funciona com um banco de dados persistente no navegador (`Zustand Local Storage`).
- **Cadastro Obrigatório:** Foi adicionado um formulário completo exigindo **Nome**, **E-mail**, **CPF** (com máscara e validação de 11 dígitos), **WhatsApp** e **Senha**.
- **Painel Dinâmico:** A área logada agora exibe uma saudação real (`Olá, [Seu Nome]!`), com a letra inicial do seu nome na foto de perfil e exibe seus dados de contato exatos.
- **Navegação SPA:** O painel lateral agora contém abas de verdade. Clicando em "Meus Dados" ou "Histórico", toda a tela muda suavemente de forma inteligente.

### 2. Correção de Bugs Matemáticos no Checkout
Refatoramos o algoritmo que realiza o controle do carrinho (`useMemo`). Agora, sempre que o usuário altera a quantidade de produtos (ex: adiciona mais 2 kits), o valor total a ser pago via PIX na aba de Revisão é recalculado dinamicamente no mesmo milissegundo.

### 3. Melhoria Anti-Travamento (Timeout do Firebase)
O site travava infinitamente carregando a tela do PIX porque as chaves de API do Firebase não são reais (chaves dummy). Criamos um mecanismo de escape (*Timeout*) de 5 segundos. Se o banco falhar, o script segue em frente e exibe a tela de pagamento com o QR Code para o usuário, permitindo testar a experiência visual.

### 4. Performance Extrema e Design
- **Favicon de Inteligência Artificial:** Geramos uma logo de design minimalista com a letra 'A' estilizada (estética preta e dourada) e substituímos o globo genérico do Next.js pelo novo `icon.png`.
- **LCP e CLS Otimizados:** Removemos fontes de gargalo render-blocking (Google Fonts via link HTTP) passando para compilação local pelo Next.js. Adicionamos a tag `sizes` nas imagens da oferta principal para reduzir o consumo de 4G de quem acessa pelo celular.
- **SEO Social:** Adicionamos as tags de OpenGraph que garantem que mensagens enviadas no WhatsApp/LinkedIn mostrem o Título rico e o Preview da Loja.
- **Padrão Brasileiro de Moeda:** Todos os preços do site foram convertidos de `R$ 00.00` para `R$ 00,00` (substituindo pontos por vírgulas) para seguir o padrão nacional.
- **Logística e Envios:** Adicionamos um seletor de frete no checkout com as opções: **Transportadora (Grátis)**, **PAC (R$ 24,90)** e **SEDEX (R$ 42,90)**. O custo de envio é somado automaticamente ao total do PIX.
- **Rastreamento de Marketing:** Integramos os scripts do **UTMfy (Pixel e UTM Tracking)** globalmente. Agora todas as suas campanhas de tráfego pago serão rastreadas automaticamente em todas as páginas da loja.

---

## ☁️ Como Enviar Novas Atualizações para a Nuvem (Netlify)

O sistema de deploy agora é **100% Automático**. O seu código já está ligado entre o GitHub e a Netlify. 

Sempre que você alterar um arquivo de código, mudar a cor de um fundo ou adicionar produtos novos no arquivo `src/lib/products.ts`, basta abrir o Terminal do seu editor Visual Studio Code/Cursor/Antigravity e digitar exatamente nesta ordem:

**1. Gravar as alterações:**
```bash
git add .
git commit -m "update v0.0.X"
```
*(Troque o "X" pelo número da nova versão do seu site)*

**2. Enviar:**
```bash
git push
```

**Pronto!** Em até 2 minutos, todo o mundo já estará acessando sua nova página sem que o site sofra nenhum segundo fora do ar.

---

*Gerado com sucesso pela inteligência artificial Antigravity/Cortex.*
*Muito sucesso com as vendas da AlphaFlow!* 🦅
