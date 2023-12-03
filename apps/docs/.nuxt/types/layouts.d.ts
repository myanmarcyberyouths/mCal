import { ComputedRef, MaybeRef } from "vue";
export type LayoutKey = "default" | "page";
declare module "../../../../node_modules/.pnpm/nuxt@3.8.1_@types+node@20.10.0_eslint@8.54.0_rollup@3.29.4_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>;
  }
}
