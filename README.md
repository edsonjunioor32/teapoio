# TEAPOIO

Site estático do TEAPOIO, um hub de informação clara e apoio local para famílias de crianças com TEA na Grande João Pessoa.

## Publicação no GitHub Pages

1. Envie este projeto para um repositório no GitHub.
2. Use a branch `main`.
3. Em **Settings → Pages**, selecione **GitHub Actions** como fonte de publicação.
4. A cada atualização na `main`, o workflow em `.github/workflows/deploy-pages.yml` instala, valida e publica o site.

O workflow também roda automaticamente todos os dias para buscar notícias nacionais, regionais e locais relacionadas ao autismo. Cada cartão mantém o link e a fonte da publicação original.

O projeto detecta automaticamente o nome do repositório para montar os caminhos de assets quando o site for publicado como projeto do GitHub Pages.

## Desenvolvimento local

```bash
cd site
npm ci
npm run dev
```

O conteúdo inicial é uma base editorial. Antes do lançamento público, substitua os exemplos por informações locais verificadas e inclua fontes e datas de revisão.
