import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {fileURLToPath, URL} from "url";
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa"
import process from 'node:process'
import replace from '@rollup/plugin-replace'


const manifestForPlugin: Partial<VitePWAOptions> = {
    mode: "development",
    registerType: "prompt",
    devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
    },

    workbox: {
        sourcemap: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    },
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
    manifest: {
        name: "mCal",
        short_name: "mCal",
        description: "Myanmar's first digital calendar",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon",
            },
            {
                src: "/maskable_icon.png",
                sizes: "225x225",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        theme_color: "#171717",
        background_color: "#e8ebf2",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};

const replaceOptions = {__DATE__: new Date().toISOString()}
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
    // @ts-ignore
    pwaOptions.srcDir = 'src'
    // @ts-ignore
    pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
    // @ts-ignore
    pwaOptions.strategies = 'injectManifest'
    // @ts-ignore
    ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
    // @ts-ignore
    ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims)
    // @ts-ignore
    pwaOptions.registerType = 'autoUpdate'

if (reload) {
    // @ts-expect-error just ignore
    replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
    // @ts-ignore
    pwaOptions.selfDestroying = selfDestroying


export default defineConfig({
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // Tauri expects a fixed port, fail if that port is not available
    server: {
        strictPort: true,
    },
    plugins: [
        react(),
        VitePWA(manifestForPlugin),
        // @ts-ignore
        replace(replaceOptions),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    // to access the Tauri environment variables set by the CLI with information about the current target
    envPrefix: ["VITE_", "TAURI_PLATFORM", "TAURI_ARCH", "TAURI_FAMILY", "TAURI_PLATFORM_VERSION", "TAURI_PLATFORM_TYPE", "TAURI_DEBUG"],
    build: {
        // Tauri uses Chromium on Windows and WebKit on macOS and Linux
        target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
        // don't minify for debug builds
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_DEBUG,
    },
});
