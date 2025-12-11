import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // When using a custom domain, set base to '/' (root)
  // This ensures all links work correctly at www.genostar.jp
  base: '/',
  locales: {
    root: {
      label: '日本語',
      lang: 'ja',
      title: 'GenoStar Inc.',
      description: 'GenoStar Inc. へようこそ',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'GenoStar Inc.',
      description: '欢迎来到 GenoStar Inc.',
      link: '/zh/',
    },
  },
});
