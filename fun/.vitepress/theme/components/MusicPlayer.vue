<script setup lang="ts">
// import '../../lib/iconfont/iconfont';    // vitepress 基于 nodejs 的项目，无法引入需要window对象的模块

import { onMounted, ref } from 'vue'
import PauseMusicController from './PauseMusicController.vue'
import PlayingMusicController from './PlayingMusicController.vue'
/**
 *
 * 音乐播放器
 */
const musics = [
  '再会之歌.mp3',
  'Song for the Beyond.mp3',
]
// 当前音乐
const currentMusic = ref('/music/再会之歌.mp3')
// 播放器元素
const audio = ref<HTMLAudioElement | null>()
// 是否播放音乐: 默认: false
const isPlayed = ref(false)
// 播放音乐的随机数字
let random = ref(0)
// 开一个定时器，什么时候需要销毁播放器可以直接清除该查询定时器
let music_palyer_timer = ref<NodeJS.Timeout | null>()

const playMusic = () => {
  /**
   * 浏览器为什么不能直接播放音乐参考博客：
   * https://blog.csdn.net/s18813688772/article/details/121103802
   */
  isPlayed.value = !isPlayed.value
  console.log('播放状态: ', isPlayed.value ? '播放' : '不播放')

  if (isPlayed.value) {
    // 如果是播放状态，则播放音乐
    audio.value?.play()
  } else {
    // 如果是暂停状态，则暂停音乐
    audio.value?.pause()
  }
}
const generateRandom = () => {
  /**
   * 生成一个与上次的数字不一样的数字
   */
  let tmp: number = Math.floor(Math.random() * musics.length)
  while (tmp === random.value) {
    tmp = Math.floor(Math.random() * musics.length)
  }
  return tmp
}
onMounted(() => {
  // 挂在完成后给一个随机音乐
  random.value = generateRandom()
  console.log(`%c第${random.value + 1}首音乐.`, 'color: green; font-weight: bolder;')
  currentMusic.value = `/music/${musics[random.value]}`

  // 提示用户可以播放音乐
  /* setTimeout(() => {
        confirm('点击右侧🎵可以播放音乐哦~');
    }, 100); */

  // 组件挂在完成即开启定时器监听音乐是否播放完成的状态
  music_palyer_timer.value = setInterval(function () {
    // 如果音频播放器获取到了，就监听是否结束的事件
    if (audio.value?.ended) {
      console.log('%c音乐结束, 下一曲~', 'color: oranger; font-weight: bold;')
      // 以播放结束的标志判断
      random.value = generateRandom()
      console.log(`%c第${random.value}首音乐.`, 'color: green; font-weight: bolder;')
      currentMusic.value = `/music/${musics[random.value]}`
      /*audio.value.onended = function () {
                // 以播放结束的事件监听形式控制
                let random: number = Math.floor(Math.random() * musics.length);
                currentMusic.value = `/music/${musics[random]}`;
                console.log('音乐结束, 下一曲~');
            }*/
    }
  }, 1000)
})

/**
 * 播放定时器的清除看情况 ...
 * Todo...
 */
</script>

<template>
  <div class="playMusic-wrapper">
    <button class="playMusic" @click="playMusic">
      <PlayingMusicController v-if="isPlayed" />
      <PauseMusicController v-else />
      <!-- <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#icon-${isPlayed ? 'music' : 'play2'}`"></use>
            </svg> -->
    </button>
    <audio ref="audio" preload="auto" :autoplay="isPlayed" :src="currentMusic" style="display: none" controls></audio>
  </div>
</template>

<style scoped lang="scss">
$PlayControler-width: 20px;
$PlayControler-height: 20px;

.playMusic-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  // width: 400px; // 测试
  height: 36px;
  margin: 0 5px;

  .playMusic {
    width: $PlayControler-width;
    height: $PlayControler-width;
    border-radius: 20%;
    font-size: 1.3rem;
    line-height: 1.3rem;

    svg {
      margin: 16px 0 0 0; // 向下移动16px，可根据需要调整
      padding: 0;
      width: $PlayControler-width;
      height: $PlayControler-width;
    }
  }
}
</style>
