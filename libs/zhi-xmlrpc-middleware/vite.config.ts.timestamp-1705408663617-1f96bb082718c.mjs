// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite@4.5.0_@types+node@16.11.7/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-static-copy@0.15.0_vite@4.3.5/node_modules/vite-plugin-static-copy/dist/index.js";
import dts from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.5/node_modules/vite-plugin-dts/dist/index.mjs";
import minimist from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js";
import livereload from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/rollup-plugin-livereload@2.0.5/node_modules/rollup-plugin-livereload/dist/index.cjs.js";
var __vite_injected_original_dirname = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-xmlrpc-middleware";
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
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGkteG1scnBjLW1pZGRsZXdhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90ZXJ3ZXIvRG9jdW1lbnRzL215ZG9jcy96aGktZnJhbWV3b3JrL3poaS9saWJzL3poaS14bWxycGMtbWlkZGxld2FyZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGkteG1scnBjLW1pZGRsZXdhcmUvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IG1pbmltaXN0IGZyb20gXCJtaW5pbWlzdFwiXG5pbXBvcnQgbGl2ZXJlbG9hZCBmcm9tIFwicm9sbHVwLXBsdWdpbi1saXZlcmVsb2FkXCJcblxuY29uc3QgYXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSlcbmNvbnN0IGlzV2F0Y2ggPSBhcmdzLndhdGNoIHx8IGFyZ3MudyB8fCBmYWxzZVxuY29uc3QgZGV2RGlzdERpciA9IFwiLi9kaXN0XCJcbmNvbnN0IGRpc3REaXIgPSBpc1dhdGNoID8gZGV2RGlzdERpciA6IFwiLi9kaXN0XCJcbi8vIGNvbnN0IGRpc3REaXIgPSBkZXZEaXN0RGlyXG5cbmNvbnNvbGUubG9nKFwiaXNXYXRjaD0+XCIsIGlzV2F0Y2gpXG5jb25zb2xlLmxvZyhcImRpc3REaXI9PlwiLCBkaXN0RGlyKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKCksXG5cbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiUkVBRE1FLm1kXCIsXG4gICAgICAgICAgZGVzdDogXCIuL1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInBhY2thZ2UuanNvblwiLFxuICAgICAgICAgIGRlc3Q6IFwiLi9cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG5cbiAgYnVpbGQ6IHtcbiAgICAvLyBcdThGOTNcdTUxRkFcdThERUZcdTVGODRcbiAgICBvdXREaXI6IGRpc3REaXIsXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwIHNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG4gICAgc291cmNlbWFwOiBmYWxzZSxcblxuICAgIGxpYjoge1xuICAgICAgLy8gQ291bGQgYWxzbyBiZSBhIGRpY3Rpb25hcnkgb3IgYXJyYXkgb2YgbXVsdGlwbGUgZW50cnkgcG9pbnRzXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgLy8gdGhlIHByb3BlciBleHRlbnNpb25zIHdpbGwgYmUgYWRkZWRcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFsuLi4oaXNXYXRjaCA/IFtsaXZlcmVsb2FkKGRldkRpc3REaXIpXSA6IFtdKV0sXG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG4gICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgZXh0ZXJuYWw6IFtdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcIm5vZGVcIixcbiAgICBpbmNsdWRlOiBbXCJzcmMvKiovKi57dGVzdCxzcGVjfS57anMsbWpzLGNqcyx0cyxtdHMsY3RzLGpzeCx0c3h9XCJdLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxzQkFBc0I7QUFDL0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGdCQUFnQjtBQVB2QixJQUFNLG1DQUFtQztBQVN6QyxJQUFNLE9BQU8sU0FBUyxRQUFRLEtBQUssTUFBTSxDQUFDLENBQUM7QUFDM0MsSUFBTSxVQUFVLEtBQUssU0FBUyxLQUFLLEtBQUs7QUFDeEMsSUFBTSxhQUFhO0FBQ25CLElBQU0sVUFBVSxVQUFVLGFBQWE7QUFHdkMsUUFBUSxJQUFJLGFBQWEsT0FBTztBQUNoQyxRQUFRLElBQUksYUFBYSxPQUFPO0FBRWhDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUVKLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLE9BQU87QUFBQTtBQUFBLElBRUwsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBO0FBQUEsSUFHYixXQUFXO0FBQUEsSUFFWCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUE7QUFBQSxNQUV4QyxVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixTQUFTLENBQUMsR0FBSSxVQUFVLENBQUMsV0FBVyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUU7QUFBQTtBQUFBO0FBQUEsTUFHdEQsVUFBVSxDQUFDO0FBQUEsTUFDWCxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixTQUFTLENBQUMsc0RBQXNEO0FBQUEsRUFDbEU7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
