import 'dotenv/config'
import { Configuration } from '@nuxt/types'

const { ENABLE_MOCK, SUPPORT_IE } = process.env

const config: Configuration = {
  mode: 'spa',
  // Doc: https://nuxtjs.org/api/configuration-srcdir/
  srcDir: 'client/',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700|Material+Icons'
      }
    ],
    ...(SUPPORT_IE === 'true'
      ? {
          script: [
            {
              src: 'https://polyfill.io/v3/polyfill.min.js?features=EventSource'
            }
          ]
        }
      : {})
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/settings.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vxm',
    '~/plugins/api',
    ...(ENABLE_MOCK === 'true' ? ['~/plugins/faker', '~/plugins/mock'] : [])
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://typescript.nuxtjs.org/
    ['@nuxt/typescript-build', { typeCheck: { eslint: true } }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { baseURL: 'https://example.com/v1' },
  /*
   ** Vuetify module configuration
   ** See https://github.com/nuxt-community/vuetify-module#options
   */
  vuetify: {
    defaultAssets: {
      font: { family: 'Noto Sans JP' }
    },
    treeShake: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Customize PostCSS Loader plugins
     */
    postcss: {
      preset: {
        // Caution: https://github.com/postcss/autoprefixer#beware-of-enabling-autoplacement-in-old-projects
        autoprefixer: SUPPORT_IE === 'true' ? { grid: 'autoplace' } : {}
      }
    }
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {},
  }
}

export default config
