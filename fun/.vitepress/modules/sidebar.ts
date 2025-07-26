// `.vitepress/config.js`
// import { generateSidebar } from 'vitepress-sidebar';

export const sidebar = {
  '/cyber/': [
    {
      text: 'cyber',
      collapsed: false,
      items: [
        { text: 'network', link: '/cyber/network.md' },
        { text: 'networkpro', link: '/cyber/networkpro.md' },
        { text: 'web', link: '/cyber/web.md' },
      ]
    }
  ],
  '/linux/': [
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
    }
  ],
  '/docker/': [
    {
      text: 'docker',
      collapsed: false,
      items: [
        { text: 'docker基础', link: '/docker/docker基础.md' },
        { text: 'docker进阶', link: '/docker/docker进阶.md' },
        { text: 'docker应用', link: '/docker/dockerApp.md' },
      ]
    }
  ],
  '/go/': [
    {
      text: 'go',
      collapsed: false,
      items: [
        { text: 'go issues', link: '/go/goIssues.md' },
        { text: 'go algo', link: '/go/goAlgo.md' },
        { text: 'go基础', link: '/go/go基础.md' },
        { text: 'go进阶', link: '/go/go进阶.md' },
      ]
    }
  ],
  '/windows/': [
    {
      text: 'windows',
      collapsed: false,
      items: [
        { text: 'WindowsCommand', link: 'windows/WindowsCommand' },
        { text: 'WindowsFundamentals', link: 'windows/WindowsFundamentals' }
      ]
    }
  ],
  '/software/': [
    {
      text: 'software',
      collapsed: false,
      items: [
        { text: '多平台软件', link: '/software/cross-platform.md' },
        { text: 'Windows 平台', link: '/software/windows.md' },
        { text: 'Mac 平台', link: '/software/mac.md' },
        { text: 'Android 平台', link: '/software/android.md' },
        { text: '浏览器设置与扩展', link: '/software/browser.md' },
        { text: 'Visual Studio Code 配置', link: '/software/vscode.md' },
      ],
    },
    {
      link: '/software/Bookmarklet.md',
      collapsed: false,
      items: [
        { text: '在线工具', link: '/software/online-tools.md' },
        { text: '书签脚本', link: '/software/Bookmarklet.md' },
      ]
    },
  ],
}
