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

function back_i(path,routepath){
	let cond:number
	let g_path = globalPath.getFullPath().split("/")
	
	if (path === 0){ cond = -1 }
	else { cond = g_path.indexOf(path) }
	
	let i = g_path.length - cond -1

	for (let y=0;y<i;y++){
		globalPath.path.pop();
	}
}

</script>

<template>
	<div class="topbar">
		<div @click="back($route.path)" class="button">
			<i class="gg-chevron-left"></i>
		</div>

		<div class="path">
			<a @click="back_i(0,$route.path)">
				Home
			</a>
			<template v-for="path of globalPath.getFullPath().split('/')">
				<pre> / </pre>
				<a @click="back_i(path,$route.path)">{{ path }}</a>
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
