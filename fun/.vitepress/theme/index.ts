import { h, watch } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'
import MusicPlayer from './components/MusicPlayer.vue'
import Visitor from './components/Visitor.vue'
import './style/index.css'
import CloudflareAISearch from './components/CFAISearch.vue'

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

export default Object.assign({}, DefaultTheme, {
  enhanceApp({ app, router }) {
    // 注册音乐播放器组件
    app.component('MusicPlayer', MusicPlayer)

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true }
      )
    }
  },
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // 相关插槽
      // https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
      'nav-bar-title-after': () => h(Visitor),
       // 挂载CloudflareAISearch
      'layout-bottom': () => h(CloudflareAISearch)
    })
})



