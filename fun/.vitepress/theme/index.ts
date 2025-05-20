import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'
import MusicPlayer from './components/MusicPlayer.vue'


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MusicPlayer', MusicPlayer)
  }
}

