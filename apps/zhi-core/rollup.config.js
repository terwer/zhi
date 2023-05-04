import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import copy from "rollup-plugin-copy"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import minimist from "minimist"

const args = minimist(process.argv.slice(2))
const isWatch = args.watch ?? false
const isProduction = !isWatch

export default {
  input: "src/main.js",
  output: {
    file: "dist/index.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    isProduction && terser(), // minify, but only in production
    copy({
      targets: [{ src: ["public/index.html", "public/favicon.ico"], dest: "dist" }],
    }),
    isWatch && serve("dist"),
    isWatch && livereload(),
  ],
}
