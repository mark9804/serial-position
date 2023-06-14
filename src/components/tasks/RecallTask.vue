<script setup lang="ts">
import { eventBus } from '@/eventBus';
import { settings } from '@/settings';
import { onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    eventBus.emit('taskEnd');
  }, settings.recallDuration * 1000);
});
</script>

<template>
  <div class="flex flex-col gap-8 px-8 text-2xl">
    <h1 class="font-bold text-4xl">再生課題を開始します</h1>
    <p>
      先ほど覚えた刺激を，1分間で出来るだけたくさん思い出し，<br />
      手元の用紙の現在のセッションの行に記述してください
    </p>
    <p>思い出す順番は自由で構いません</p>
    <p>画面が切り替わったら課題終了です</p>
  </div>
</template>

<style scoped lang="scss"></style>
