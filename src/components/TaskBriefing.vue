<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { settings } from '@/settings';
import { computed } from 'vue';
import { h } from 'vue';
import { useRouter } from 'vue-router';
import { ExperimentType, SessionString } from '@/types/ExperimentTypes';

const router = useRouter();

const params = computed(() => router.currentRoute.value.params);

const experimentType = computed(
  () => params.value.experimentType as ExperimentType
);
const session = computed(() => params.value.session as SessionString);
const experimentNames = {
  memorize: '記銘課題',
  calculate: '計算課題',
  recall: '再生課題',
};

function getExperimentName(experimentType: ExperimentType): string {
  return experimentNames[experimentType] || experimentType;
}

const sessionBriefingsMap = [
  {
    type: 'memorize',
    contents: [
      '呈示される刺激をできる限り暗記してください',
      '各刺激の呈示時間は1秒間です',
      'どのように暗記しても構いませんが、メモは禁止です',
      '準備ができたら Enter キーを押して課題を開始してください',
    ],
  },
  {
    type: 'calculate',
    contents: [
      '呈示された数字から3を引き続け、声に出して解答してください',
      '声を出せない場合は、頭の中で計算してください',
      '計算課題が終わるとすぐに再生課題が始まります',
    ],
  },
  {
    type: 'recall',
    contents: [
      '先ほど覚えた刺激を，1分間で出来るだけたくさん思い出してください',
      '思い出した刺激を，手元の用紙の現在のセッションの行に記述してください',
      '思い出す順番は自由で構いません',
      '画面が切り替わったら課題終了です',
    ],
  },
];

function renderSessionBriefing(type: ExperimentType) {
  const sessionBriefing = sessionBriefingsMap.find(
    sessionBriefing => sessionBriefing.type === type
  );
  if (!sessionBriefing) {
    return;
  }
  return h('div', { class: 'flex flex-col gap-8 px-8 text-2xl' }, [
    h(
      'h1',
      {
        class: 'font-bold text-4xl',
      },
      `${
        'calculate' !== experimentType.value
          ? 'これから'
          : `${settings.waitTimeBeforeCalculate}秒後に`
      }` +
        getExperimentName(experimentType.value) +
        'を行います'
    ),
    sessionBriefing.contents.map(content => h('p', null, content)),
  ]);
}

// eslint-disable-next-line
const SessionBriefing = renderSessionBriefing(experimentType.value) as any;

// handle experiment type
switch (experimentType.value) {
  case 'memorize':
    console.log('memorize');
    eventBus.on('enterKeyPressed', () => {
      console.log('enterKeyPressed on ExperimentBriefing');
      eventBus.off('enterKeyPressed');
      console.log('enterKeyPressed off ExperimentBriefing');
      setTimeout(() => {
        router.push({
          name: 'TaskComponent',
          params: {
            experimentType: 'memorize',
            session: session.value,
          },
        });
      }, 4);
    });
    break;
  case 'calculate':
    console.log('calculate');
    setTimeout(() => {
      router.push({
        name: 'TaskComponent',
        params: {
          experimentType: 'calculate',
          session: session.value,
        },
      });
    }, settings.waitTimeBeforeCalculate * 1000);
    break;
  case 'recall':
    console.log('recall');
    break;
  default:
    break;
}
</script>

<template>
  <SessionBriefing />
</template>

<style scoped lang="scss"></style>
