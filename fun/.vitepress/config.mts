import { defineConfig } from 'vitepress'
import { nav, sidebar, socialLinks } from './modules'
import { loadEnv } from 'vite' 
import path from 'path'

// 关键代码：手动加载环境变量
const env = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd() + '/fun',  // 如果 .env 在 fun/ 目录
  'VITE_'
)

// console.log('DEBUG ->', {
//   cwd: process.cwd(),
//   envFiles: [
//     path.resolve(process.cwd(), '.env'),
//     path.resolve(process.cwd(), '.env.local'),
//   ],
//   loadedEnv: env
// })


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: env.VITE_SITE_NAME || '默认标题',
  description: "just for fun",
  lastUpdated: true,
  cleanUrls: true,
  // sitemap: {
  //   hostname: 'https://weasontang.github.io'
  // },
  themeConfig: {
    logo: '/butterfly-flower.png',
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Weason Tang'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks
  },

  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/butterfly-flower.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/butterfly-flower.png' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    // 添加google analytics
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-RJMPP58S6J' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      gtag('config', 'G-RJMPP58S6J');`
    ],
    // 添加 n8n chat
    [
      'link',
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css' }
    ],
    [
      'script',
      { type: 'module' },
      `
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        createChat({
          webhookUrl: '${env.VITE_N8N_WEBHOOK_URL}'
        });
      `
    ],
    // vocechat
    // [
    //   'script',
    //   {
    //     'data-host-id': '1',
    //     'data-auto-reg': 'false',
    //     'data-login-token': '',
    //     'data-title': '',
    //     'data-logo': '',
    //     'data-theme-color': '#1fe1f9',
    //     'data-close-width': '48',
    //     'data-close-height': '48',
    //     'data-open-width': '380',
    //     'data-open-height': '680',
    //     'data-welcome': '你好呀!',
    //     'data-welcome-color': '#1fe1f9',
    //     'data-welcome-font-size': '16',
    //     'data-welcome-font-weight': '400',
    //     "async": '',
    //     "src": 'https://chat.weason.dpdns.org/widget.js'
    //   }
    // ]
  ],
})
