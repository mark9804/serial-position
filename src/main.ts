import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { routerConvert } from './routes/routes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from './App.vue';
import { eventBus } from './eventBus';
import './style.scss';

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    eventBus.emit('enterKeyPressed');
  }
});

const pinia = createPinia();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createApp(App).use(pinia).use(routerConvert).mount('#app');
