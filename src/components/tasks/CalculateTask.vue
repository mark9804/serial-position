<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { settings } from '@/settings';
import { onMounted } from 'vue';

function generateRandomInt(min = 100, max = 999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(() => {
  setTimeout(() => {
    eventBus.emit('taskEnd');
  }, settings.calculateDuration * 1000);
});
</script>

<template>
  <div class="flex flex-col gap-8 px-8 text-2xl">
    {{ generateRandomInt() }}
  </div>
</template>

<style scoped lang="scss"></style>
