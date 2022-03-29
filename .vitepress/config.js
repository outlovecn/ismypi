import { defineConfig } from "vitepress";
export default defineConfig({
  base: "/",
  lang: "zh-CN",
  title: "Is My PI",
  description: "Just playing around.",
  themeConfig: {
    author: "Chaos",
    copyright: true,
    navbar: [
      {
        name: "首页",
        link: "/",
      },
      {
        name: "标签",
        link: "/tags/",
      },
      {
        name: "分类",
        link: "/categories/",
      },
      {
        name: "前端网站",
        link: "/sites/index",
      },
      {
        name: "在线工具",
        link: "/tools/index",
      },
      {
        name: "关于我",
        link: "/about/index",
      },
    ],
  },
  vite: {
    build: {
      minify: "terser",
    },
  },
});
