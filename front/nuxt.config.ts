// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost/api",
    },
  },
  css: [`~/assets/css/main.css`],
  tailwindcss: {},
});
