// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-primevue',
  ],
  devServer: {
    port: 3002,
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark',
    classSuffix: '',
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  components: [
    '~/Components',
    { path: '~/Components/Common' },
    { path: '~/Components/Forms' },
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: true,
      ripple: true,
      inputStyle: 'filled',
    },
    importPT: undefined,
    components: {
      prefix: 'Prime',
      include: '*',
      exclude: ['Galleria', 'Carousel'],
    },
    composables: {
      include: ['useConfirm', 'useToast'],
    },
    directives: {
      include: ['Tooltip'],
    },
  },

  nitro: {
    experimental: {
      wasm: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
    storage: {
      fs: {
        driver: 'fs',
        base: './data',
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'The only karaoke app you need.' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      DOMAIN: 'localhost',
      API_URL: 'https://localhost:7215', // 'http://localhost:5215',
      MQ_API_URL: 'https://localhost:7027',
    },
  },
})
