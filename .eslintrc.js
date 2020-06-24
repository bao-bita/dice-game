module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['vuejs-accessibility'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier/vue',
    'plugin:vuejs-accessibility/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {}
};
