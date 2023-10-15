const pacote = require("pacote")
// console.log(pacote)
pacote.manifest("vue@^3").then((pkg) => {
  console.log("package manifest for registry pkg:", pkg)
})
