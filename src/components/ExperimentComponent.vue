<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSerialPositionStore } from '@/store/store';
import { ExperimentType, SessionString } from '@/types/ExperimentTypes.ts';
import CalculateTask from '@components/tasks/CalculateTask.vue';
import MemorizeTask from '@components/tasks/MemorizeTask.vue';
import RecallTask from '@components/tasks/RecallTask.vue';

const router = useRouter();
const useStore = useSerialPositionStore();
const params = computed(() => router.currentRoute.value.params);
const experimentType = computed(
  () => params.value.experimentType as ExperimentType
);
const session = computed(() => params.value.session as SessionString);

const sessionOrder = computed(() => useStore.getSessionOrder);

const hasThreeSessions = computed(
  () => 1 === sessionOrder.value[session.value * 1 - 1] * 1
);

const templates = [
  {
    name: 'memorize',
    component: MemorizeTask,
  },
  {
    name: 'calculate',
    component: CalculateTask,
  },
  {
    name: 'recall',
    component: RecallTask,
  },
];

function handleNextExperiment(
  session: SessionString,
  experimentType: ExperimentType
) {
  const currentSession = (session as unknown as number) * 1;
  if ('recall' === experimentType) {
    if (currentSession >= 6) {
      router.replace({
        name: 'ExperimentEnd',
      });
    } else {
      router.replace({
        name: 'SessionEnd',
        params: {
          session: currentSession,
        },
      });
    }
  }
  if ('calculate' === experimentType) {
    router.replace({
      name: 'TaskComponent',
      params: {
        experimentType: 'recall',
        session: currentSession,
      },
    });
  }
  if ('memorize' === experimentType) {
    if (hasThreeSessions.value) {
      router.replace({
        name: 'TaskBriefing',
        params: {
          experimentType: 'calculate',
          session: currentSession,
        },
      });
    } else {
      router.replace({
        name: 'TaskComponent',
        params: {
          experimentType: 'recall',
          session: currentSession,
        },
      });
    }
  }
}

eventBus.on('taskEnd', () => {
  setTimeout(
    () => handleNextExperiment(session.value, experimentType.value),
    4
  );
});

const currentComponent = () => {
  const template = templates.find(
    template => template.name === experimentType.value
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (template ? template.component : null) as any;
};

onUnmounted(() => {
  eventBus.off('taskEnd');
});
</script>

<template>
  <component :is="currentComponent()" />
</template>

<style scoped lang="scss"></style>
