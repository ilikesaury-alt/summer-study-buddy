import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 部署时自动设置子路径,本地开发用根路径
// GITHUB_REPOSITORY 格式为 "用户名/仓库名",提取仓库名作为 base
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const base = repoName && repoName !== `${process.env.GITHUB_REPOSITORY?.split('/')[0]}.github.io`
  ? `/${repoName}/`
  : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: '暑假学习小管家',
        short_name: '学习管家',
        description: '暑假作业打卡、复习出题、预习新知识,二升三同学的学习好伙伴',
        theme_color: '#FFC93C',
        background_color: '#FFF9F0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        lang: 'zh-CN',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // 预缓存所有静态资源,支持离线使用
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // 让新的 Service Worker 立即激活并接管所有客户端,
        // 避免"必须关闭所有标签页再重开才能更新"的问题
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            // HTML 文档使用 NetworkFirst,确保用户能快速拿到最新版本
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            // Google 字体离线缓存
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      devOptions: {
        enabled: true, // 开发环境也启用,方便在局域网测试
      },
    }),
  ],
})
