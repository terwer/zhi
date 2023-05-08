// vite.config.ts
import { defineConfig } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/registry.npmjs.org+vite@4.2.2_@types+node@18.15.11/node_modules/vite/dist/node/index.js";
import { join } from "path";
import { viteStaticCopy } from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/registry.npmjs.org+vite-plugin-static-copy@0.14.0_vite@4.2.2/node_modules/vite-plugin-static-copy/dist/index.js";
import dts from "file:///Users/terwer/Documents/mydocs/zhi-framework/zhi/node_modules/.pnpm/registry.npmjs.org+vite-plugin-dts@2.3.0_vite@4.2.2/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-blog-api";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: join(__vite_injected_original_dirname, "tsconfig.json"),
      skipDiagnostics: true
    }),
    // viteTsConfigPaths({
    //   root: "../../",
    // }),
    viteStaticCopy({
      targets: [
        {
          src: "README.md",
          dest: "./"
        }
      ]
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es"]
    },
    rollupOptions: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktYmxvZy1hcGlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90ZXJ3ZXIvRG9jdW1lbnRzL215ZG9jcy96aGktZnJhbWV3b3JrL3poaS9saWJzL3poaS1ibG9nLWFwaS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGVyd2VyL0RvY3VtZW50cy9teWRvY3MvemhpLWZyYW1ld29yay96aGkvbGlicy96aGktYmxvZy1hcGkvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiXG4vLyBpbXBvcnQgdml0ZVRzQ29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIlxuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgZW50cnlSb290OiBcInNyY1wiLFxuICAgICAgdHNDb25maWdGaWxlUGF0aDogam9pbihfX2Rpcm5hbWUsIFwidHNjb25maWcuanNvblwiKSxcbiAgICAgIHNraXBEaWFnbm9zdGljczogdHJ1ZSxcbiAgICB9KSxcblxuICAgIC8vIHZpdGVUc0NvbmZpZ1BhdGhzKHtcbiAgICAvLyAgIHJvb3Q6IFwiLi4vLi4vXCIsXG4gICAgLy8gfSksXG5cbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiUkVBRE1FLm1kXCIsXG4gICAgICAgICAgZGVzdDogXCIuL1wiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcblxuICAvLyBVbmNvbW1lbnQgdGhpcyBpZiB5b3UgYXJlIHVzaW5nIHdvcmtlcnMuXG4gIC8vIHdvcmtlcjoge1xuICAvLyAgcGx1Z2luczogW1xuICAvLyAgICB2aXRlVHNDb25maWdQYXRocyh7XG4gIC8vICAgICAgcm9vdDogJy4uLy4uLycsXG4gIC8vICAgIH0pLFxuICAvLyAgXSxcbiAgLy8gfSxcblxuICAvLyBDb25maWd1cmF0aW9uIGZvciBidWlsZGluZyB5b3VyIGxpYnJhcnkuXG4gIC8vIFNlZTogaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2J1aWxkLmh0bWwjbGlicmFyeS1tb2RlXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHMuXG4gICAgICBlbnRyeTogXCJzcmMvaW5kZXgudHNcIixcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgICAvLyBDaGFuZ2UgdGhpcyB0byB0aGUgZm9ybWF0cyB5b3Ugd2FudCB0byBzdXBwb3J0LlxuICAgICAgLy8gRG9uJ3QgZm9yZ290IHRvIHVwZGF0ZSB5b3VyIHBhY2thZ2UuanNvbiBhcyB3ZWxsLlxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBFeHRlcm5hbCBwYWNrYWdlcyB0aGF0IHNob3VsZCBub3QgYmUgYnVuZGxlZCBpbnRvIHlvdXIgbGlicmFyeS5cbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICB9LFxuICB9LFxuXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgaW5jbHVkZTogW1wic3JjLyoqLyoue3Rlc3Qsc3BlY30ue2pzLG1qcyxjanMsdHMsbXRzLGN0cyxqc3gsdHN4fVwiXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxZQUFZO0FBQ3JCLFNBQVMsc0JBQXNCO0FBRS9CLE9BQU8sU0FBUztBQU5oQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixXQUFXO0FBQUEsTUFDWCxrQkFBa0IsS0FBSyxrQ0FBVyxlQUFlO0FBQUEsTUFDakQsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUQsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBYUEsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUE7QUFBQTtBQUFBLE1BR1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVLENBQUM7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsU0FBUyxDQUFDLHNEQUFzRDtBQUFBLEVBQ2xFO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
