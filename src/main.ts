import App from '@/App.vue'
import { createApp } from 'vue';
import router from '@/router';

import { sleep } from './types/utils';
import useGithub from '@/composable/GithubComposable';

function appResize() {
	document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
}

(async() => {

	await useGithub().load();

	const app = createApp(App);

	app.use(router);
	app.mount('#app');

	window.addEventListener('resize', appResize);

	const css = [
		'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css',
		'https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu+Mono&display=swap',
		'https://css.gg/all.css',
	];

	const head = document.querySelector('head');
	if(head !== null) {
		for (let item of css) {
			let lib = document.createElement('link');
			lib.href = item;
			lib.setAttribute('rel', 'stylesheet');
			head.appendChild(lib);
		}
	}

	appResize();

	let a = document.querySelector<HTMLElement>('#loader');
	if (a !== null) {
		a.style.opacity = '0';
		await sleep(1000);
		a.style.display = 'none';
	}
})();
