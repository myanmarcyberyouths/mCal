// Generated by nitro

// App Config
import type { Defu } from "defu";

import type { default as appConfig0 } from "D:/Web Dev/Open source projects/myanmar-calendar/apps/docs/app.config";
import type { default as appConfig1 } from "D:/Web Dev/Open source projects/myanmar-calendar/node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.8.1_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/docus/app.config";
import type { default as appConfig2 } from "D:/Web Dev/Open source projects/myanmar-calendar/node_modules/.pnpm/@nuxt-themes+typography@0.11.0_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/typography/app.config";
import type { default as appConfig3 } from "D:/Web Dev/Open source projects/myanmar-calendar/node_modules/.pnpm/@nuxt-themes+elements@0.9.5_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/elements/app.config";

type UserAppConfig = Defu<
  {},
  [typeof appConfig0, typeof appConfig1, typeof appConfig2, typeof appConfig3]
>;

declare module "nitropack" {
  interface AppConfig extends UserAppConfig {}
}

export {};