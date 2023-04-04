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
    'arrow-parens': ['error', 'as-needed'], // требует круглые скобки вокруг параметров у стрелочных функций только при необходимости
    'no-unused-vars': 'error', // запрещает неиспользуемые переменные
    const: ['error', 'always'], // требует использовать const вместо let или var, когда переменная не переназначается
    quotes: ['error', 'single'], // требует использовать одинарные кавычки для строковых литералов
  },
};
