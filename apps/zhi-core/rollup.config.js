import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import copy from "rollup-plugin-copy"
import serve from "rollup-plugin-serve"

const isProduction = !process.env.ROLLUP_WATCH

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
    serve("dist"),
  ],
}
