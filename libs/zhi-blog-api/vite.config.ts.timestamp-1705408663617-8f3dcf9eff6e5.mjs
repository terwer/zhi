// vite.config.ts
import { defineConfig } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite@4.5.0_@types+node@16.11.7/node_modules/vite/dist/node/index.js";
import { join } from "path";
import { viteStaticCopy } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-static-copy@0.15.0_vite@4.3.5/node_modules/vite-plugin-static-copy/dist/index.js";
import dts from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.5/node_modules/vite-plugin-dts/dist/index.mjs";
import minimist from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js";
import livereload from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/rollup-plugin-livereload@2.0.5/node_modules/rollup-plugin-livereload/dist/index.cjs.js";
var __vite_injected_original_dirname = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-blog-api";
var args = minimist(process.argv.slice(2));
var isWatch = args.watch || args.w || false;
var devDistDir = "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-publisher/public/libs/zhi-blog-api";
var distDir = isWatch ? devDistDir : "./dist";
console.log("isWatch=>", isWatch);
console.log("distDir=>", distDir);
var vite_config_default = defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: join(__vite_injected_original_dirname, "tsconfig.json"),
      skipDiagnostics: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: "README.md",
          dest: "./"
        },
        {
          src: "package.json",
          dest: "./"
        }
      ]
    })
  ],
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    // 输出路径
    outDir: distDir,
    emptyOutDir: false,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es"]
    },
    rollupOptions: {
      plugins: [...isWatch ? [livereload(devDistDir)] : []],
      // External packages that should not be bundled into your library.
      external: []
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktYmxvZy1hcGlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90ZXJ3ZXIvRG9jdW1lbnRzL215ZG9jcy96aGktZnJhbWV3b3JrL3poaS9saWJzL3poaS1ibG9nLWFwaS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktYmxvZy1hcGkvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IG1pbmltaXN0IGZyb20gXCJtaW5pbWlzdFwiXG5pbXBvcnQgbGl2ZXJlbG9hZCBmcm9tIFwicm9sbHVwLXBsdWdpbi1saXZlcmVsb2FkXCJcblxuY29uc3QgYXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSlcbmNvbnN0IGlzV2F0Y2ggPSBhcmdzLndhdGNoIHx8IGFyZ3MudyB8fCBmYWxzZVxuY29uc3QgZGV2RGlzdERpciA9IFwiL1VzZXJzL3Rlcndlci9Eb2N1bWVudHMvbXlkb2NzL3NpeXVhbi1wbHVnaW5zL3NpeXVhbi1wbHVnaW4tcHVibGlzaGVyL3B1YmxpYy9saWJzL3poaS1ibG9nLWFwaVwiXG5jb25zdCBkaXN0RGlyID0gaXNXYXRjaCA/IGRldkRpc3REaXIgOiBcIi4vZGlzdFwiXG4vLyBjb25zdCBkaXN0RGlyID0gZGV2RGlzdERpclxuXG5jb25zb2xlLmxvZyhcImlzV2F0Y2g9PlwiLCBpc1dhdGNoKVxuY29uc29sZS5sb2coXCJkaXN0RGlyPT5cIiwgZGlzdERpcilcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgZW50cnlSb290OiBcInNyY1wiLFxuICAgICAgdHNDb25maWdGaWxlUGF0aDogam9pbihfX2Rpcm5hbWUsIFwidHNjb25maWcuanNvblwiKSxcbiAgICAgIHNraXBEaWFnbm9zdGljczogdHJ1ZSxcbiAgICB9KSxcblxuICAgIHZpdGVTdGF0aWNDb3B5KHtcbiAgICAgIHRhcmdldHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJSRUFETUUubWRcIixcbiAgICAgICAgICBkZXN0OiBcIi4vXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwicGFja2FnZS5qc29uXCIsXG4gICAgICAgICAgZGVzdDogXCIuL1wiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcblxuICAvLyBDb25maWd1cmF0aW9uIGZvciBidWlsZGluZyB5b3VyIGxpYnJhcnkuXG4gIC8vIFNlZTogaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2J1aWxkLmh0bWwjbGlicmFyeS1tb2RlXG4gIGJ1aWxkOiB7XG4gICAgLy8gXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XG4gICAgb3V0RGlyOiBkaXN0RGlyLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcblxuICAgIC8vIFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMCBzb3VyY2UgbWFwIFx1NjU4N1x1NEVGNlxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG5cbiAgICBsaWI6IHtcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50cy5cbiAgICAgIGVudHJ5OiBcInNyYy9pbmRleC50c1wiLFxuICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcbiAgICAgIC8vIENoYW5nZSB0aGlzIHRvIHRoZSBmb3JtYXRzIHlvdSB3YW50IHRvIHN1cHBvcnQuXG4gICAgICAvLyBEb24ndCBmb3Jnb3QgdG8gdXBkYXRlIHlvdXIgcGFja2FnZS5qc29uIGFzIHdlbGwuXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFsuLi4oaXNXYXRjaCA/IFtsaXZlcmVsb2FkKGRldkRpc3REaXIpXSA6IFtdKV0sXG4gICAgICAvLyBFeHRlcm5hbCBwYWNrYWdlcyB0aGF0IHNob3VsZCBub3QgYmUgYnVuZGxlZCBpbnRvIHlvdXIgbGlicmFyeS5cbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICB9LFxuICB9LFxuXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgaW5jbHVkZTogW1wic3JjLyoqLyoue3Rlc3Qsc3BlY30ue2pzLG1qcyxjanMsdHMsbXRzLGN0cyxqc3gsdHN4fVwiXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxZQUFZO0FBQ3JCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxnQkFBZ0I7QUFQdkIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTSxPQUFPLFNBQVMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLElBQU0sVUFBVSxLQUFLLFNBQVMsS0FBSyxLQUFLO0FBQ3hDLElBQU0sYUFBYTtBQUNuQixJQUFNLFVBQVUsVUFBVSxhQUFhO0FBR3ZDLFFBQVEsSUFBSSxhQUFhLE9BQU87QUFDaEMsUUFBUSxJQUFJLGFBQWEsT0FBTztBQUdoQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixXQUFXO0FBQUEsTUFDWCxrQkFBa0IsS0FBSyxrQ0FBVyxlQUFlO0FBQUEsTUFDakQsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLElBRUQsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQSxFQUlBLE9BQU87QUFBQTtBQUFBLElBRUwsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBO0FBQUEsSUFHYixXQUFXO0FBQUEsSUFFWCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQTtBQUFBO0FBQUEsTUFHVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixTQUFTLENBQUMsR0FBSSxVQUFVLENBQUMsV0FBVyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUU7QUFBQTtBQUFBLE1BRXRELFVBQVUsQ0FBQztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixTQUFTLENBQUMsc0RBQXNEO0FBQUEsRUFDbEU7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
