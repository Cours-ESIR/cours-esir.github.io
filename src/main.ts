import { createApp, ref } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.globalPath = ref([]);

app.mount('#app');

const appResize = () => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

window.addEventListener('resize', appResize)

appResize()