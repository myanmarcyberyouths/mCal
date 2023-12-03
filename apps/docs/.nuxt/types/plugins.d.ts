// Generated by Nuxt'
import type { Plugin } from "#app";

type Decorate<T extends Record<string, any>> = {
  [K in keyof T as K extends string ? `$${K}` : never]: T[K];
};

type InjectionType<A extends Plugin> = A extends Plugin<infer T>
  ? Decorate<T>
  : unknown;

type NuxtAppInjections = InjectionType<
  typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/revive-payload.server").default
> &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/revive-payload.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/head/runtime/plugins/unhead").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/pages/runtime/plugins/router").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxt+devtools@1.0.4_nuxt@3.8.1_rollup@3.29.4_vite@4.5.0/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.server").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxt+devtools@1.0.4_nuxt@3.8.1_rollup@3.29.4_vite@4.5.0/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxt+content@2.9.0_nuxt@3.8.1_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt/content/dist/runtime/plugins/ws").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxt+content@2.9.0_nuxt@3.8.1_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt/content/dist/runtime/legacy/plugins/documentDriven").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/pinceau@0.18.9_postcss@8.4.31/node_modules/pinceau/dist/runtime/schema.server").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxtjs+color-mode@3.3.0_rollup@3.29.4/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxtjs+color-mode@3.3.0_rollup@3.29.4/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxtjs+plausible@0.2.3_rollup@3.29.4/node_modules/@nuxtjs/plausible/dist/runtime/plugin.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/chunk-reload.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/check-outdated-build.client").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.8.1_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/docus/plugins/menu").default
  > &
  InjectionType<
    typeof import("../../../../node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.8.1_postcss@8.4.31_rollup@3.29.4_vue@3.3.8/node_modules/@nuxt-themes/docus/plugins/scrollbars.client").default
  >;

declare module "#app" {
  interface NuxtApp extends NuxtAppInjections {}
}

declare module "vue" {
  interface ComponentCustomProperties extends NuxtAppInjections {}
}

export {};
