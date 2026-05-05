<script setup lang="ts">
import { onMounted } from 'vue';

function onChatMessage(event: CustomEvent) {
  console.log('Chat message:', event.detail);
}
const apiUrl = import.meta.env.VITE_CF_AI_SEARCH_URL;

onMounted(async () => {
  if (typeof window === 'undefined') return;
  // 动态导入，只有在浏览器环境下执行
  await import('@cloudflare/ai-search-snippet');
});
</script>


<template>
  <div>

    <!-- Chat Bubble Widget -->
    <chat-bubble-snippet
      :api-url="apiUrl"
      placeholder="From Himmel..."
      @chat-message="onChatMessage"
    />
  </div>
</template>

<style>
/* Customize with CSS Variables */
chat-bubble-snippet {
  --search-snippet-primary-color: #96C8E6;
  /* 气泡圆角 */
  --chat-bubble-border-radius: 16px;
}

.chat-container {
  height: 500px;
}
</style>
