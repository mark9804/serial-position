import { createApp } from 'vue';
import { routerConvert } from './routes/routes';
// @ts-ignore
import App from './App.vue';
import { eventBus } from './eventBus';
import './style.scss';

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    eventBus.emit('enterKeyPressed');
  }
});

createApp(App).use(routerConvert).mount('#app');
