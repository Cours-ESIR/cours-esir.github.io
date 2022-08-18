<script lang="ts" setup>
import router from '@/router/index';
import usePath from '@/composable/PathComposable';
const globalPath = usePath();

function back(route: string) {
	if (route === '/viewer') {
		router.push({
			path: '/lessons',
		});
	} else {
		globalPath.path.pop();
	}
}

function share() {
	window.navigator.share({
		title: document.title,
		url: document.location.toString(),
	});
}

function rewind(route: string, count: number) {
	globalPath.stepBack(count);
	if(route === '/lessons') return;
	router.push('/lessons');
}

</script>

<template>
	<div class="topbar">
		<div @click="back($route.path)" class="button">
			<i class="gg-chevron-left"></i>
		</div>

		<div class="path">
			<a @click="rewind($route.path, globalPath.path.length)">
				<i class="gg-home"></i>
			</a>
			<template v-for="(path, index) of globalPath.path">
				<pre> / </pre>
				<a @click="rewind($route.path, globalPath.path.length - (index+1))">{{ path }}</a>
			</template>
		</div>

		<div onclick="window.print()" class="button">
			<i class="gg-printer"></i>
		</div>
		<div @click="share()" class="button">
			<i class="gg-share"></i>
		</div>
	</div>
</template>

<style scoped>
.gg-share {
	transform: translate(-100%);
}
.topbar {
	display: grid;
	grid-template-columns: 40px auto 40px 40px;
	background-color: var(--background);
	z-index: 50000;
	column-gap: 15px;
	border-bottom: 3px solid var(--compl);
	user-select: none;

}

.path {
	margin: 0;
	display: flex;
    justify-content: center;
    align-items: center;
}

.path > *{
	cursor:pointer;
	margin:0;
}

.button {
	cursor:pointer;
	display: grid;
	place-items: center;
	aspect-ratio: 1/1;
	height: calc(100% - 6px);
	border-radius: 999px;
	border: 3px solid transparent;
	transition: 0.5s;
}

.button:hover {
	border: 3px solid var(--text);
}
</style>
