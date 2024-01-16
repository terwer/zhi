// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite@4.5.0_@types+node@16.11.7/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-static-copy@0.15.0_vite@4.3.5/node_modules/vite-plugin-static-copy/dist/index.js";
import dts from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.5/node_modules/vite-plugin-dts/dist/index.mjs";
import minimist from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js";
import livereload from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/rollup-plugin-livereload@2.0.5/node_modules/rollup-plugin-livereload/dist/index.cjs.js";
import { nodePolyfills } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/vite-plugin-node-polyfills@0.15.0_vite@4.3.5/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-notion-markdown";
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
    }),
    // 在浏览器中polyfill node
    // https://github.com/davidmyersdev/vite-plugin-node-polyfills/blob/main/test/src/main.ts
    nodePolyfills({
      exclude: ["fs"],
      protocolImports: true
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktbm90aW9uLW1hcmtkb3duXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktbm90aW9uLW1hcmtkb3duL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90ZXJ3ZXIvRG9jdW1lbnRzL215ZG9jcy96aGktZnJhbWV3b3JrL3poaS9saWJzL3poaS1ub3Rpb24tbWFya2Rvd24vdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IG1pbmltaXN0IGZyb20gXCJtaW5pbWlzdFwiXG5pbXBvcnQgbGl2ZXJlbG9hZCBmcm9tIFwicm9sbHVwLXBsdWdpbi1saXZlcmVsb2FkXCJcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIlxuXG5jb25zdCBhcmdzID0gbWluaW1pc3QocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKVxuY29uc3QgaXNXYXRjaCA9IGFyZ3Mud2F0Y2ggfHwgYXJncy53IHx8IGZhbHNlXG5jb25zdCBkZXZEaXN0RGlyID0gXCIuL2Rpc3RcIlxuY29uc3QgZGlzdERpciA9IGlzV2F0Y2ggPyBkZXZEaXN0RGlyIDogXCIuL2Rpc3RcIlxuLy8gY29uc3QgZGlzdERpciA9IGRldkRpc3REaXJcblxuY29uc29sZS5sb2coXCJpc1dhdGNoPT5cIiwgaXNXYXRjaClcbmNvbnNvbGUubG9nKFwiZGlzdERpcj0+XCIsIGRpc3REaXIpXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKCksXG5cbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiUkVBRE1FLm1kXCIsXG4gICAgICAgICAgZGVzdDogXCIuL1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInBhY2thZ2UuanNvblwiLFxuICAgICAgICAgIGRlc3Q6IFwiLi9cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRwb2x5ZmlsbCBub2RlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkbXllcnNkZXYvdml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvYmxvYi9tYWluL3Rlc3Qvc3JjL21haW4udHNcbiAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgIGV4Y2x1ZGU6IFtcImZzXCJdLFxuICAgICAgcHJvdG9jb2xJbXBvcnRzOiB0cnVlLFxuICAgIH0pLFxuICBdLFxuXG4gIGJ1aWxkOiB7XG4gICAgLy8gXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XG4gICAgb3V0RGlyOiBkaXN0RGlyLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcblxuICAgIC8vIFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMCBzb3VyY2UgbWFwIFx1NjU4N1x1NEVGNlxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG5cbiAgICBsaWI6IHtcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcbiAgICAgIC8vIHRoZSBwcm9wZXIgZXh0ZW5zaW9ucyB3aWxsIGJlIGFkZGVkXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBwbHVnaW5zOiBbLi4uKGlzV2F0Y2ggPyBbbGl2ZXJlbG9hZChkZXZEaXN0RGlyKV0gOiBbXSldLFxuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0uanNcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIGluY2x1ZGU6IFtcInNyYy8qKi8qLnt0ZXN0LHNwZWN9LntqcyxtanMsY2pzLHRzLG10cyxjdHMsanN4LHRzeH1cIl0sXG4gIH0sXG59IGFzIGFueSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxzQkFBc0I7QUFDL0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHFCQUFxQjtBQVI5QixJQUFNLG1DQUFtQztBQVV6QyxJQUFNLE9BQU8sU0FBUyxRQUFRLEtBQUssTUFBTSxDQUFDLENBQUM7QUFDM0MsSUFBTSxVQUFVLEtBQUssU0FBUyxLQUFLLEtBQUs7QUFDeEMsSUFBTSxhQUFhO0FBQ25CLElBQU0sVUFBVSxVQUFVLGFBQWE7QUFHdkMsUUFBUSxJQUFJLGFBQWEsT0FBTztBQUNoQyxRQUFRLElBQUksYUFBYSxPQUFPO0FBQ2hDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUVKLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUlELGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsT0FBTztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUE7QUFBQSxJQUdiLFdBQVc7QUFBQSxJQUVYLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQTtBQUFBLE1BRXhDLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFNBQVMsQ0FBQyxHQUFJLFVBQVUsQ0FBQyxXQUFXLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBRTtBQUFBO0FBQUE7QUFBQSxNQUd0RCxVQUFVLENBQUM7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFNBQVMsQ0FBQyxzREFBc0Q7QUFBQSxFQUNsRTtBQUNGLENBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
