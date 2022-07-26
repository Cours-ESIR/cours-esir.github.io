import { createApp } from 'vue';
import router from './router/index';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');

const appResize = () => {
	document.documentElement.style.setProperty(
		'--vh',
		`${window.innerHeight}px`
	);
	document.documentElement.style.setProperty(
		'--vw',
		`${window.innerWidth}px`
	);
};

window.addEventListener('resize', appResize);

appResize();
