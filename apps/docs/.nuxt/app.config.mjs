
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "D:/Web Dev/Open source projects/myanmar-calendar/apps/docs/app.config.ts"
import cfg1 from "D:/Web Dev/Open source projects/myanmar-calendar/node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.8.1_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/docus/app.config.ts"
import cfg2 from "D:/Web Dev/Open source projects/myanmar-calendar/node_modules/.pnpm/@nuxt-themes+typography@0.11.0_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/typography/app.config.ts"
import cfg3 from "D:/Web Dev/Open source projects/myanmar-calendar/node_modules/.pnpm/@nuxt-themes+elements@0.9.5_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/elements/app.config.ts"

export default /* #__PURE__ */ defuFn(cfg0, cfg1, cfg2, cfg3, inlineConfig)
