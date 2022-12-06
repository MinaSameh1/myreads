// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 1 // warn
  }
};
