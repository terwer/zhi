// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite@4.5.0_@types+node@16.11.7/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-static-copy@0.15.0_vite@4.3.5/node_modules/vite-plugin-static-copy/dist/index.js";
import dts from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.5/node_modules/vite-plugin-dts/dist/index.mjs";
import minimist from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js";
import livereload from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/rollup-plugin-livereload@2.0.5/node_modules/rollup-plugin-livereload/dist/index.cjs.js";
var __vite_injected_original_dirname = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-github-middleware";
var args = minimist(process.argv.slice(2));
var isWatch = args.watch || args.w || false;
var devDistDir = "./dist";
var distDir = isWatch ? devDistDir : "./dist";
console.log("isWatch=>", isWatch);
console.log("distDir=>", distDir);
var vite_config_default = defineConfig({
  plugins: [
    dts(),
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
  build: {
    // 输出路径
    outDir: distDir,
    emptyOutDir: false,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      // the proper extensions will be added
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      plugins: [...isWatch ? [livereload(devDistDir)] : []],
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        entryFileNames: "[name].js"
      }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktZ2l0aHViLW1pZGRsZXdhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90ZXJ3ZXIvRG9jdW1lbnRzL215ZG9jcy96aGktZnJhbWV3b3JrL3poaS9saWJzL3poaS1naXRodWItbWlkZGxld2FyZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktZ2l0aHViLW1pZGRsZXdhcmUvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IG1pbmltaXN0IGZyb20gXCJtaW5pbWlzdFwiXG5pbXBvcnQgbGl2ZXJlbG9hZCBmcm9tIFwicm9sbHVwLXBsdWdpbi1saXZlcmVsb2FkXCJcblxuY29uc3QgYXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSlcbmNvbnN0IGlzV2F0Y2ggPSBhcmdzLndhdGNoIHx8IGFyZ3MudyB8fCBmYWxzZVxuY29uc3QgZGV2RGlzdERpciA9IFwiLi9kaXN0XCJcbmNvbnN0IGRpc3REaXIgPSBpc1dhdGNoID8gZGV2RGlzdERpciA6IFwiLi9kaXN0XCJcbi8vIGNvbnN0IGRpc3REaXIgPSBkZXZEaXN0RGlyXG5cbmNvbnNvbGUubG9nKFwiaXNXYXRjaD0+XCIsIGlzV2F0Y2gpXG5jb25zb2xlLmxvZyhcImRpc3REaXI9PlwiLCBkaXN0RGlyKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKCksXG5cbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiUkVBRE1FLm1kXCIsXG4gICAgICAgICAgZGVzdDogXCIuL1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInBhY2thZ2UuanNvblwiLFxuICAgICAgICAgIGRlc3Q6IFwiLi9cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG5cbiAgYnVpbGQ6IHtcbiAgICAvLyBcdThGOTNcdTUxRkFcdThERUZcdTVGODRcbiAgICBvdXREaXI6IGRpc3REaXIsXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwIHNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG4gICAgc291cmNlbWFwOiBmYWxzZSxcblxuICAgIGxpYjoge1xuICAgICAgLy8gQ291bGQgYWxzbyBiZSBhIGRpY3Rpb25hcnkgb3IgYXJyYXkgb2YgbXVsdGlwbGUgZW50cnkgcG9pbnRzXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgLy8gdGhlIHByb3BlciBleHRlbnNpb25zIHdpbGwgYmUgYWRkZWRcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFsuLi4oaXNXYXRjaCA/IFtsaXZlcmVsb2FkKGRldkRpc3REaXIpXSA6IFtdKV0sXG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG4gICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgZXh0ZXJuYWw6IFtdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgaW5jbHVkZTogW1wic3JjLyoqLyoue3Rlc3Qsc3BlY30ue2pzLG1qcyxjanMsdHMsbXRzLGN0cyxqc3gsdHN4fVwiXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxnQkFBZ0I7QUFQdkIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTSxPQUFPLFNBQVMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLElBQU0sVUFBVSxLQUFLLFNBQVMsS0FBSyxLQUFLO0FBQ3hDLElBQU0sYUFBYTtBQUNuQixJQUFNLFVBQVUsVUFBVSxhQUFhO0FBR3ZDLFFBQVEsSUFBSSxhQUFhLE9BQU87QUFDaEMsUUFBUSxJQUFJLGFBQWEsT0FBTztBQUVoQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFFSixlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQTtBQUFBLElBR2IsV0FBVztBQUFBLElBRVgsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBO0FBQUEsTUFFeEMsVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsU0FBUyxDQUFDLEdBQUksVUFBVSxDQUFDLFdBQVcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFFO0FBQUE7QUFBQTtBQUFBLE1BR3RELFVBQVUsQ0FBQztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsU0FBUyxDQUFDLHNEQUFzRDtBQUFBLEVBQ2xFO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
