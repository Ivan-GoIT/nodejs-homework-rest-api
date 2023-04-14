module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'indent': ['warn', 2],
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
  },
};
