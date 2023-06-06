/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    // Note: This feature is required to use NextJS Image in SSG mode.
    // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
