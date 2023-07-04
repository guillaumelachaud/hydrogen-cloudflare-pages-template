/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />

import type {Storefront} from '@shopify/hydrogen';
import {HydrogenCloudflareSession} from "./src/session";

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    CLOUDFLARE_ANALYTICS_TOKEN: string;
  }
}

/**
 * Declare local additions to `AppLoadContext` to include the session utilities we injected in `server.ts`.
 */
declare module '@remix-run/cloudflare' {
  export interface AppLoadContext {
    session: HydrogenCloudflareSession;
    storefront: Storefront;
    env: Env;
  }
}
