<script setup lang="ts">
import { settings } from '@/settings';
import { computed } from 'vue';
import { useSerialPositionStore } from '@/store/store';
import { useClipboard } from '@vueuse/core';

const useStore = useSerialPositionStore();
const { copy } = useClipboard({ legacy: true });

const groupOrder = computed(() => useStore.getGroupOrder);

function getExperimentIdentifier() {
  return groupOrder.value.join('');
}

const experimentIdentifier = computed(() => getExperimentIdentifier());

function handleNext() {
  copy(experimentIdentifier.value)
    .catch(e => {
      alert(
        'コピーに失敗しました。番号をメモして，フォームに入力してください。'
      );
      console.error(e);
    })
    .then(() => {
      window.open(settings.formUrl, '_blank');
    });
}
</script>

<template>
  <div class="flex flex-col gap-8 px-8 text-2xl">
    <h1 class="font-bold text-4xl">実験課題はこれで終わります</h1>
    <p>あなたの６桁の系列識別番号は：{{ getExperimentIdentifier() }}</p>
    <p>「コピー」ボタンを押して，クリップボードにコピーしてください</p>
    <p>この後，課題中に思い出した刺激を入力してもらいます</p>
    <p>下のボタンをを押して入力フォームを提出してください</p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="handleNext"
    >
      系列識別番号をコピーして入力フォームに移動する
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
