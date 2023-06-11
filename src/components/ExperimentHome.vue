<script setup lang="ts">
import { useRouter } from 'vue-router';
import { eventBus } from '../eventBus.ts';

const router = useRouter();

eventBus.on('enterKeyPressed', () => {
  console.log('enterKeyPressed on start');
  eventBus.off('enterKeyPressed');
  console.log('enterKeyPressed off start');
  setTimeout(() => {
    router.push({
      name: 'OverallExperimentBriefing',
      query: {
        nextSession: 1,
      },
    });
  }, 4);
});
</script>

<template>
  <div class="columns-2 flex">
    <div class="text-2xl flex flex-col gap-8 px-8">
      <h1 class="font-bold text-4xl">説明</h1>
      <p>この実験は紙とペンを使用します（紙とペンはなんでも構いません）</p>
      <p>
        用意できたら，右の図のようにセッション１ー６と記述してください<br />
        その際，上下の間隔は余裕を持つようにしてください
      </p>
      <p>準備ができたら Enter キーを押して次に進んでください</p>
    </div>
    <img alt="説明" src="@assets/intro_paper.jpg" />
  </div>
</template>

<style scoped lang="scss">
img {
  width: 48vw;
  min-width: 512px;
  max-width: 720px;
}
</style>
