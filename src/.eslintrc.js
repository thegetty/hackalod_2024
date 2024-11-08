module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "plugin:json/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
