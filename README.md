# Hydrogen Cloudflare Pages Template

This repository contains a demo Shopify Hydrogen store ready to be deployed on Cloudflare Pages. It is based off the demo [tutorial](https://shopify.dev/docs/custom-storefronts/hydrogen/building) from Shopify but contains the following changes:
 - Configured to be deployed on Cloudflare Pages. No dependency on Oxygen
 - Full typescript
 - Uses PNPM and Turbo for repository and dependencies setup
 - Github Actions to deploy to Cloudflare Pages

## Getting Started

### Environment Variables
Add the required environment variables to a `.dev.vars` file at the root of the `store` directory:

```
SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="YOUR_STOREFRONT_TOKEN"
PUBLIC_STORE_DOMAIN="YOUR_STORE.myshopify.com"
```
💡 You can use hydrogen-preview.myshopify.com and its default token to quickly test the store.

For production, we will need to set these variables directly in Cloudflare Pages.

#### Development
Run the following command to start the development server:

```
pnpm dev
```


## Deployment
Because Cloudflare Pages doesn't support PNPM natively yet, this store can not be built directly on Cloudflare Pages. Instead, it uses Github Actions to build the store and deploy it to Cloudflare Pages.
Define `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as secrets in your repository settings. See the Action's [doc](https://github.com/cloudflare/pages-action) for more information on how to generate the token.

