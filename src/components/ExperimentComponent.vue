<script setup lang="ts">
import { eventBus } from '@/eventBus.ts';
import { useRouter } from 'vue-router';
import SerialPosition from '@components/experiments/SerialPosition.vue';

const router = useRouter();
const params = router.currentRoute.value.params;
const experimentType = params.experimentType;
// const session = params.session;
const templates = [
  {
    name: 'memorize',
    component: SerialPosition,
  },
];

eventBus.on('experimentEnd', () => {
  console.log('experimentEnd');
});

const currentComponent = () => {
  const template = templates.find(template => template.name === experimentType);
  return template ? template.component : null;
};
</script>

<template>
  <component :is="currentComponent()" />
</template>

<style scoped lang="scss"></style>
