module.exports = {
  extends: ["next", "turbo", "prettier"],

  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },

  plugins: ["prettier"],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "import/no-anonymous-default-export": "off",
    "turbo/no-undeclared-env-vars": "off",
    "@next/next/no-html-link-for-pages": "off",
    "prettier/prettier": "error",
  },
}
