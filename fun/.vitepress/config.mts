import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "威森",
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
    nav: [
      { text: 'Home', link: '/' },
      // cyber
      {
        text: 'cyber',
        items: [
          { text: 'network', link: '/cyber/network.md' },
          { text: 'web', link: '/cyber/web.md' },
          { text: 'networkpro', link: '/cyber/networkpro.md' },
        ]
      },
      // linux
      {
        text: 'linux',
        items: [
          { text: 'linux常用命令', link: '/linux/linux命令' },
          { text: 'archlinux应用', link: '/linux/archlinuxApp.md' },
          { text: 'linux shells', link: '/linux/LinuxShell.md' },
        ]
      },
      // docker
      {
        text: 'docker',
        items: [
          { text: 'docker基础', link: '/docker/docker基础.md' },
          { text: 'docker进阶', link: '/docker/docker进阶.md' },
          { text: 'docker应用', link: '/docker/dockerApp.md' },
        ]
      },
      // go
      {
        text: 'go',
        items: [
          { text: 'go issues', link: '/go/goIssues.md' },
          { text: 'go algo', link: '/go/goAlgo.md' },
          { text: 'go基础', link: '/go/go基础.md' },
          { text: 'go进阶', link: '/go/go进阶.md' },
        ]
      },
    ],

    sidebar: [
      {
        text: 'cyber',
        collapsed: false,
        items: [
          { text: 'network', link: '/cyber/network.md' },
          { text: 'web', link: '/cyber/web.md' },
          { text: 'networkpro', link: '/cyber/networkpro.md' },
        ]
      },
      {
        text: 'linux',
        collapsed: false,
        items: [
          { text: 'linux常用命令', link: '/linux/linux命令' },
          { text: 'vscode相关命令', link: '/linux/vscode相关命令.md' },
          { text: 'go linux相关操作', link: '/linux/golinux相关操作.md' },
          { text: 'Git相关命令操作', link: '/linux/Git相关命令操作.md' },
          { text: 'archlinux应用', link: '/linux/archlinuxApp.md' },
          { text: 'linux基础', link: '/linux/LinuxFundamentals.md' },
          { text: 'linux shells', link: '/linux/LinuxShell.md' },
        ]
      },
      // docker
      {
        text: 'docker',
        collapsed: false,
        items: [
          { text: 'docker基础', link: '/docker/docker基础.md' },
          { text: 'docker进阶', link: '/docker/docker进阶.md' },
          { text: 'docker应用', link: '/docker/dockerApp.md' },
        ]
      },
      // go
      {
        text: 'go',
        collapsed: true,
        items: [
          { text: 'go issues', link: '/go/goIssues.md' },
          { text: 'go algo', link: '/go/goAlgo.md' },
          { text: 'go基础', link: '/go/go基础.md' },
          { text: 'go进阶', link: '/go/go进阶.md' },
        ]
      },
      // windows
      {
        text: 'windows',
        collapsed: true,
        items: [
          { text: 'windows常用命令', link: '/windows/WindowsCommand.md' },
          { text: 'windows基础', link: '/windows/WindowsFundamentals.md' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Anduin2017/HowToCook' },
      { icon: 'bilibili', link: 'https://tv.591746.xyz/' },
      {
        icon: {
          svg: '<img src="/notebooklm.svg" alt="Custom Icon" style="width: 24px; height: 24px;">'
        }, link: 'https://notebooklm.google.com'
      },
      // {
      //   icon: {
      //     svg: '<img src="/花卉.png" alt="Custom Icon" style="width: 24px; height: 24px;">'
      //   }, link: 'https://chat.weason.dpdns.org'
      // },
    ]
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
          webhookUrl: 'https://n8n-mmplospk.ap-northeast-1.clawcloudrun.com/webhook/4fb35e49-a9ff-4119-a5cd-69764a2aec7a/chat'
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
