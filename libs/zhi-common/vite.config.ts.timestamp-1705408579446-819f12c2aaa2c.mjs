// vite.config.ts
import { defineConfig } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite@4.5.0_@types+node@16.11.7/node_modules/vite/dist/node/index.js";
import { join } from "path";
import { viteStaticCopy } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-static-copy@0.15.0_vite@4.3.5/node_modules/vite-plugin-static-copy/dist/index.js";
import dts from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.5/node_modules/vite-plugin-dts/dist/index.mjs";
import minimist from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js";
import livereload from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/rollup-plugin-livereload@2.0.5/node_modules/rollup-plugin-livereload/dist/index.cjs.js";
var __vite_injected_original_dirname = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-common";
var args = minimist(process.argv.slice(2));
var isWatch = args.watch || args.w || false;
var devDistDir = "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-publisher/public/libs/zhi-common";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktY29tbW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktY29tbW9uL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90ZXJ3ZXIvRG9jdW1lbnRzL215ZG9jcy96aGktZnJhbWV3b3JrL3poaS9saWJzL3poaS1jb21tb24vdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IG1pbmltaXN0IGZyb20gXCJtaW5pbWlzdFwiXG5pbXBvcnQgbGl2ZXJlbG9hZCBmcm9tIFwicm9sbHVwLXBsdWdpbi1saXZlcmVsb2FkXCJcblxuY29uc3QgYXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSlcbmNvbnN0IGlzV2F0Y2ggPSBhcmdzLndhdGNoIHx8IGFyZ3MudyB8fCBmYWxzZVxuY29uc3QgZGV2RGlzdERpciA9IFwiL1VzZXJzL3Rlcndlci9Eb2N1bWVudHMvbXlkb2NzL3NpeXVhbi1wbHVnaW5zL3NpeXVhbi1wbHVnaW4tcHVibGlzaGVyL3B1YmxpYy9saWJzL3poaS1jb21tb25cIlxuY29uc3QgZGlzdERpciA9IGlzV2F0Y2ggPyBkZXZEaXN0RGlyIDogXCIuL2Rpc3RcIlxuLy8gY29uc3QgZGlzdERpciA9IGRldkRpc3REaXJcblxuY29uc29sZS5sb2coXCJpc1dhdGNoPT5cIiwgaXNXYXRjaClcbmNvbnNvbGUubG9nKFwiZGlzdERpcj0+XCIsIGRpc3REaXIpXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHtcbiAgICAgIGVudHJ5Um9vdDogXCJzcmNcIixcbiAgICAgIHRzQ29uZmlnRmlsZVBhdGg6IGpvaW4oX19kaXJuYW1lLCBcInRzY29uZmlnLmpzb25cIiksXG4gICAgICBza2lwRGlhZ25vc3RpY3M6IHRydWUsXG4gICAgfSksXG5cbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiUkVBRE1FLm1kXCIsXG4gICAgICAgICAgZGVzdDogXCIuL1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInBhY2thZ2UuanNvblwiLFxuICAgICAgICAgIGRlc3Q6IFwiLi9cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG5cbiAgLy8gQ29uZmlndXJhdGlvbiBmb3IgYnVpbGRpbmcgeW91ciBsaWJyYXJ5LlxuICAvLyBTZWU6IGh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9idWlsZC5odG1sI2xpYnJhcnktbW9kZVxuICBidWlsZDoge1xuICAgIC8vIFx1OEY5M1x1NTFGQVx1OERFRlx1NUY4NFxuICAgIG91dERpcjogZGlzdERpcixcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXG5cbiAgICAvLyBcdTY3ODRcdTVFRkFcdTU0MEVcdTY2MkZcdTU0MjZcdTc1MUZcdTYyMTAgc291cmNlIG1hcCBcdTY1ODdcdTRFRjZcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuXG4gICAgbGliOiB7XG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHMuXG4gICAgICBlbnRyeTogXCJzcmMvaW5kZXgudHNcIixcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgICAvLyBDaGFuZ2UgdGhpcyB0byB0aGUgZm9ybWF0cyB5b3Ugd2FudCB0byBzdXBwb3J0LlxuICAgICAgLy8gRG9uJ3QgZm9yZ290IHRvIHVwZGF0ZSB5b3VyIHBhY2thZ2UuanNvbiBhcyB3ZWxsLlxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBwbHVnaW5zOiBbLi4uKGlzV2F0Y2ggPyBbbGl2ZXJlbG9hZChkZXZEaXN0RGlyKV0gOiBbXSldLFxuICAgICAgLy8gRXh0ZXJuYWwgcGFja2FnZXMgdGhhdCBzaG91bGQgbm90IGJlIGJ1bmRsZWQgaW50byB5b3VyIGxpYnJhcnkuXG4gICAgICBleHRlcm5hbDogW10sXG4gICAgfSxcbiAgfSxcblxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIGluY2x1ZGU6IFtcInNyYy8qKi8qLnt0ZXN0LHNwZWN9LntqcyxtanMsY2pzLHRzLG10cyxjdHMsanN4LHRzeH1cIl0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsWUFBWTtBQUNyQixTQUFTLHNCQUFzQjtBQUMvQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sZ0JBQWdCO0FBUHZCLElBQU0sbUNBQW1DO0FBU3pDLElBQU0sT0FBTyxTQUFTLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUMzQyxJQUFNLFVBQVUsS0FBSyxTQUFTLEtBQUssS0FBSztBQUN4QyxJQUFNLGFBQWE7QUFDbkIsSUFBTSxVQUFVLFVBQVUsYUFBYTtBQUd2QyxRQUFRLElBQUksYUFBYSxPQUFPO0FBQ2hDLFFBQVEsSUFBSSxhQUFhLE9BQU87QUFHaEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLE1BQ1gsa0JBQWtCLEtBQUssa0NBQVcsZUFBZTtBQUFBLE1BQ2pELGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQSxJQUVELGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUEsRUFJQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQTtBQUFBLElBR2IsV0FBVztBQUFBLElBRVgsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUE7QUFBQTtBQUFBLE1BR1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsU0FBUyxDQUFDLEdBQUksVUFBVSxDQUFDLFdBQVcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFFO0FBQUE7QUFBQSxNQUV0RCxVQUFVLENBQUM7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsU0FBUyxDQUFDLHNEQUFzRDtBQUFBLEVBQ2xFO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
