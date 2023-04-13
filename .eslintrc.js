module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'], 
    'no-unused-vars': 'error', 
    const: ['error', 'always'], 
    quotes: ['error', 'single'], 
  },
};
