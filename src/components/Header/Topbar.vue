<script lang="ts" setup>
import router from '@/router/index';
import usePath from '@/composable/PathComposable';
const globalPath = usePath();

function back(route: string) {
	globalPath.stepBack(1);
}

function share() {
	window.navigator.share({
		title: document.title,
		url: document.location.toString(),
	});
}

</script>

<template>
	<div class="topbar">
		<a @click="back($route.path)" class="button">
			<i class="gg-chevron-left"></i>
		</a>

		<div class="path">
			<a @click="globalPath.stepBack(globalPath.path.length)" style="height: 10px;">
				<i class="gg-home"></i>
			</a>
			<template v-for="(path, index) of globalPath.path">
				<pre style="margin:0 2px"> / </pre>
				<a @click="globalPath.stepBack(globalPath.path.length - (index+1))">{{ path }}</a>
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
    justify-content: left;
    align-items: center;
	overflow: auto;
}

.path > *{
	cursor:pointer;
	margin:0;
	white-space: nowrap;
}

.button {
	cursor:pointer;
	display: grid;
	place-items: center;
	aspect-ratio: 1/1;
	height: 100%;
}

.button:hover > *{
	color: var(--red);
}
</style>
