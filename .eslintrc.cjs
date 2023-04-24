module.exports = {
  root: true,
  extends: ["custom"],

  overrides: [
    {
      files: ["*.ts", "*.js"],
    },
  ],

  rules: {
    "no-undef": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
}
