import { h } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'
import MusicPlayer from './components/MusicPlayer.vue'
import Visitor from './components/Visitor.vue'

export default Object.assign({}, DefaultTheme, {
  enhanceApp({ app }) {
    app.component('MusicPlayer', MusicPlayer)
  },
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // 相关插槽
      // https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
      'nav-bar-title-after': () => h(Visitor)
    })
})



