import { defineConfig } from "vitepress"
import typedocSidebar from "../api/typedoc-sidebar.json"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "Zhi Framework",
  description: "The ultimate framework for building blog and theme",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "Blog", link: "/blog/" },
      { text: "API", link: "/api/" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "API",
        items: typedocSidebar as any[],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/terwer/zhi" }],
  },
})
