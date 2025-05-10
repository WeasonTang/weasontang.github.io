import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "威森",
  description: "just for fun",
  themeConfig: {
    logo: '/butterfly-flower.png',
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // cyber
      {
        text: 'cyber',
        items: [
          { text: 'shortcut', link: '/cyber/shortcut.md' },
          { text: 'network', link: '/cyber/network.md' },
          { text: 'web', link: '/cyber/web.md' },
        ]
      },
      // linux
      {
        text: 'linux',
        items: [
          { text: 'linux常用命令', link: '/linux/linux命令' },
          { text: 'vscode相关命令', link: '/linux/vscode相关命令.md' },
          { text: 'go linux相关操作', link: '/linux/go linux相关操作.md' },
          { text: 'Git相关命令操作', link: '/linux/Git相关命令操作.md' },
          { text: 'archlinux应用', link: '/linux/archlinux_app.md' },
        ]
      },
      // docker
      {
        text: 'docker',
        items: [
          { text: 'docker基础', link: '/docker/docker基础.md' },
          { text: 'docker进阶', link: '/docker/docker进阶.md' },
          { text: 'docker_app', link: '/docker/docker_app.md' },
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
        text: 'algo',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'java algo', link: '/algo/java algo.md' },
        ]
      },
      {
        text: 'cyber',
        collapsed: true,
        items: [
          { text: 'shortcut', link: '/cyber/shortcut.md' },
          { text: 'network', link: '/cyber/network.md' },
          { text: 'web', link: '/cyber/web.md' },
        ]
      },
      {
        text: 'linux',
        collapsed: true,
        items: [
          { text: 'linux常用命令', link: '/linux/linux命令' },
          { text: 'vscode相关命令', link: '/linux/vscode相关命令.md' },
          { text: 'go linux相关操作', link: '/linux/go linux相关操作.md' },
          { text: 'Git相关命令操作', link: '/linux/Git相关命令操作.md' },
          { text: 'archlinux应用', link: '/linux/archlinux_app.md' },
        ]
      },
      // docker
      {
        text: 'docker',
        collapsed: true,
        items: [
          { text: 'docker基础', link: '/docker/docker基础.md' },
          { text: 'docker进阶', link: '/docker/docker进阶.md' },
          { text: 'docker_app', link: '/docker/docker_app.md' },
          { text: 'DevOps_java', link: '/docker/DevOps_java.md' },
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WeasonTang' },
      { icon: 'bilibili', link: 'https://video.weason.dpdns.org/' },
      {
        icon: {
          svg: '<img src="/花卉.png" alt="Custom Icon" style="width: 24px; height: 24px;">'
        }, link: 'https://chat.weason.dpdns.org/'
      },
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
