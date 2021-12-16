import { defineConfig } from 'vitepress'
export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Is My PI',
  description: 'Just playing around.',
  themeConfig: {
    author: 'Chaos',
    navbar: [
      {
        name: '首页',
        link: '/',
      },
      {
        name: '标签',
        link: '/tags/',
      },
      {
        name: '分类',
        link: '/categories/',
      },
      {
        name: '前端网站',
        link: '/sites/',
      },
      {
        name: '在线工具',
        link: '/tools/',
      },
      {
        name: '关于我',
        link: '/about/',
      },
    ],
  },
  vite: {
    build: {
      minify: 'terser',
    },
  },
})
