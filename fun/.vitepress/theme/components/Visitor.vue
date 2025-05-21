<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()

</script>

<template>
  <!-- &p=${route.path}  -->
  <img
    class="visitor"
    :src="`https://visitor-badge.laobi.icu/badge?page_id=weasontang.io`"
    onerror="this.style.display='none'"
  />
</template>

<style scoped>
.visitor {
  margin-left: 8px;
}
@media (min-width: 768px) and (max-width: 920px) {
  .visitor {
    display: none;
  }
}
</style>