import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/start',
  },
  {
    path: '/start',
    name: 'ExperimentHome',
    component: () => import('@components/ExperimentHome.vue'),
  },
  {
    path: '/briefing',
    name: 'OverallExperimentBriefing',
    component: () => import('@components/OverallExperimentBriefing.vue'),
  },
  {
    path: '/sessions/:session/:experimentType/briefing',
    name: 'ExperimentBriefing',
    component: () => import('@components/ExperimentBriefing.vue'),
  },
  {
    path: '/sessions/:session/:experimentType/start',
    name: 'ExperimentComponent',
    component: () => import('@components/ExperimentComponent.vue'),
  },
  {
    path: '/sessions/:session/:experimentType/end',
    name: 'ExperimentEnd',
    component: () => import('@components/ExperimentEnd.vue'),
  },
  {
    path: '/sessions/:session/end',
    name: 'SessionEnd',
    component: () => import('@components/SessionEnd.vue'),
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
