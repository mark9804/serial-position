<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const params = computed(() => router.currentRoute.value.params);
const currentSession = computed(() => params.value.session as string);

eventBus.on('enterKeyPressed', () => {
  console.log('enterKeyPressed');
  router.replace({
    name: 'OverallExperimentBriefing',
    query: {
      nextSession: (currentSession.value as unknown as number) * 1 + 1,
    },
  });
});
</script>

<template>
  <div class="flex flex-col gap-8 px-8 text-2xl">
    <h1 class="font-bold text-4xl">このセッションはこれで終了です</h1>
    <p>
      このセッションで記入した刺激は見えないように隠してください<br />
      （別の紙で覆う、裏に折りたたむなどしてください）
    </p>
    <p>必要であればここで休憩をとっても構いません</p>
    <p>準備ができたらEnterキーを押して、次に進んでください</p>
  </div>
</template>

<style scoped lang="scss"></style>
