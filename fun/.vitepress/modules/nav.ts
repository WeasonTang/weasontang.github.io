export const nav = [
  { text: 'Home', link: '/' },
  {
    text: 'cyber',
    items: [
      { text: 'network', link: '/cyber/network.md' },
      { text: 'web', link: '/cyber/web.md' },
      { text: 'networkpro', link: '/cyber/networkpro.md' },
    ]
  },
  {
    text: 'linux',
    items: [
      { text: 'linux常用命令', link: '/linux/linux命令' },
      { text: 'archlinux应用', link: '/linux/archlinuxApp.md' },
      { text: 'linux shells', link: '/linux/LinuxShell.md' },
    ]
  },
  {
    text: 'docker',
    items: [
      { text: 'docker基础', link: '/docker/docker基础.md' },
      { text: 'docker进阶', link: '/docker/docker进阶.md' },
      { text: 'docker应用', link: '/docker/dockerApp.md' },
    ]
  },
  {
    text: 'go',
    items: [
      { text: 'go issues', link: '/go/goIssues.md' },
      { text: 'go algo', link: '/go/goAlgo.md' },
      { text: 'go基础', link: '/go/go基础.md' },
      { text: 'go进阶', link: '/go/go进阶.md' },
    ]
  },
  {
    component: 'MusicPlayer',
    // 可选的 props 传递给组件
    props: {
      title: 'MusicPlayer'
    }
  },
]