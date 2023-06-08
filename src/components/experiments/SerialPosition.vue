<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { settings } from '@/settings.ts';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSerialPositionStore } from '@/store/store';
import { WordSet } from '@/types/ExperimentTypes';

const useStore = useSerialPositionStore();

const router = useRouter();
const params = computed(() => router.currentRoute.value.params);
const session = computed(() => (params.value.session as unknown as number) * 1);

const groupOrder = computed(() => useStore.getGroupOrder);
const wordListByGroup = computed(
  () =>
    useStore.getWordListByGroup(groupOrder.value[session.value - 1]) as WordSet
);

const currentWord = ref('');

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function switchWords(count: number) {
  if (0 === count) {
    currentWord.value = '';
    eventBus.emit('experimentEnd');
  } else {
    currentWord.value = wordListByGroup.value.words[10 - count];
    await wait(settings.waitTime);
    await switchWords(count - 1);
  }
}

onMounted(() => {
  switchWords(10);
});
</script>

<template>
  <div class="flex flex-col text-4xl px-8 font-bold">{{ currentWord }}</div>
</template>

<style scoped lang="scss"></style>
