module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/unicorn',
    'prettier/vue'
  ],
  globals: { $nuxt: 'readonly' },
  rules: {
    'max-lines': ['error', 200],
    'no-console': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'no-unused-vars': 'off',
    'prefer-template': 'error'
  },
  overrides: [
    {
      files: ['apis/**/*.ts'],
      rules: { camelcase: ['off'] }
    }
  ]
}
