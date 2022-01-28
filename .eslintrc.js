// const { off } = require("./src/models/Contact");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'eslint-disable-next-line dot-notation': off,
    'eslint-disable-next-line max-len': off,
  },
};
