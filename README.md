# CatalogaBR Web

Site institucional estático da **CatalogaBR**, uma API em desenvolvimento para consultar e catalogar dados brasileiros de forma simples e consistente.

O projeto começa com dois conjuntos de dados essenciais:

- **CEP:** endereços brasileiros estruturados para cadastros, entregas e validações.
- **Código de barras:** informações de produtos consultadas por códigos GTIN/EAN.

> A API, sua documentação e o acesso público ainda estão em desenvolvimento.

## Recursos do site

- Layout responsivo para computadores, tablets e celulares.
- Identidade visual baseada nas cores da logo da CatalogaBR.
- Conteúdo disponível em português e inglês.
- Seleção automática de idioma conforme as preferências do navegador.
- Seletor manual de idioma com preferência salva localmente.
- Tema claro e escuro.
- Tema inicial baseado na configuração do sistema operacional.
- Botão para alternar o tema, com preferência salva no navegador.
- Animações suaves com respeito à configuração `prefers-reduced-motion`.
- Páginas personalizadas para erros HTTP 404 e 500.
- Configuração pronta para hospedagem no IIS.

## Estrutura

```text
.
├── index.html       # Página principal
├── 404.html         # Página de rota não encontrada
├── 500.html         # Página de erro interno
├── styles.css       # Layout, temas, animações e responsividade
├── app.js           # Idioma, tema e interações
├── Logo.svg         # Logo vetorial e favicon
├── Logo.png         # Logo em formato raster
├── web.config       # Configuração para IIS
└── about.zrfi       # Metadados do projeto
```

## Executar localmente

O site não exige instalação de dependências ou processo de compilação. Basta servir a pasta por um servidor HTTP estático.

Com Python:

```bash
python -m http.server 8080
```

Depois, acesse [http://localhost:8080](http://localhost:8080).

Também é possível abrir o `index.html` diretamente no navegador, embora um servidor local represente melhor o comportamento da hospedagem final.

## Idiomas

Na primeira visita, o site verifica os idiomas preferidos do navegador:

- Se houver um idioma da família `pt`, o conteúdo é exibido em português.
- Para os demais idiomas, o conteúdo é exibido em inglês.

O visitante pode alternar entre **PT** e **EN** no cabeçalho. A escolha é armazenada no `localStorage` com a chave `catalogabr-language`.

Os textos traduzidos ficam centralizados no objeto `translations`, dentro de `app.js`.

## Tema

Sem uma escolha anterior, o tema segue a preferência do sistema por meio de `prefers-color-scheme`.

O botão no cabeçalho permite alternar entre os temas claro e escuro. A escolha manual é armazenada no `localStorage` com a chave `catalogabr-theme`.

As cores e os ajustes dos temas estão definidos em `styles.css` usando propriedades personalizadas do CSS e o atributo `data-theme` no elemento `<html>`.

## Páginas de erro

O arquivo `web.config` configura o IIS para encaminhar:

- Respostas **404** para `404.html`.
- Respostas **500** para `500.html`.

Ele também desativa a listagem de diretórios e define `index.html` como documento padrão.

Em outros serviços de hospedagem, configure as páginas de erro conforme a documentação da plataforma utilizada.

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript puro
- IIS `web.config`

Não há frameworks, bibliotecas externas ou dependências de produção.

## Desenvolvimento

Ao alterar o projeto:

1. Preserve o funcionamento em português e inglês.
2. Confira os temas claro e escuro.
3. Teste o layout em telas pequenas e grandes.
4. Verifique as páginas `404.html` e `500.html`.
5. Evite apresentar endpoints como disponíveis enquanto a API estiver em desenvolvimento.

## Status

**Em desenvolvimento.** A primeira versão pública da CatalogaBR será disponibilizada futuramente.
