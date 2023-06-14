<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSerialPositionStore } from '@/store/store';
import { Session } from '@/types/ExperimentTypes';

const router = useRouter();
const useStore = useSerialPositionStore();

const query = computed(() => router.currentRoute.value.query);

const sessionOrder = computed(() => useStore.getSessionOrder);

const nextSession = computed(
  () =>
    ((query.value.nextSession as unknown as number) * 1) as unknown as Session
);

console.log(nextSession.value);

const hasThreeSessions = computed(
  () => 1 === sessionOrder.value[nextSession.value - 1] * 1
);

eventBus.on('enterKeyPressed', () => {
  const next = nextSession.value;
  console.log('next', next);
  eventBus.off('enterKeyPressed');
  setTimeout(() => {
    router.replace({
      name: 'TaskBriefing',
      params: {
        session: next,
        experimentType: 'memorize',
      },
    });
  }, 4);
});
</script>

<template>
  <div class="flex flex-col gap-8 px-8 text-2xl">
    <h1 class="font-bold text-4xl">
      これからのセッションでは以下の順番で
      {{ hasThreeSessions ? '3' : '2' }} つの課題を行います
    </h1>
    <p>
      1. 記銘課題<br />
      呈示される刺激をできる限り暗記してください<br />
      各刺激の呈示時間は 1 秒間です<br />
      どのように暗記しても構いませんが、メモは禁止です
    </p>
    <p v-if="hasThreeSessions">
      2. 計算課題<br />
      呈示された数字から 3 を引き続け、声に出して解答してください<br />
      声を出せない場合は、頭の中で計算してください<br />
      例：300 → 297 → 294 → 291・・・
    </p>
    <p>
      {{ hasThreeSessions ? '3' : '2' }}. 再生課題<br />
      記銘課題で覚えた刺激を 1 分間でできる限りたくさん思い出して、<br />
      手元の用紙に記述してください。思い出す順番は自由で構いません
    </p>
    <p>課題について理解出来たら，Enter キーを押して実験を始めてください</p>
  </div>
</template>

<style scoped lang="scss"></style>
