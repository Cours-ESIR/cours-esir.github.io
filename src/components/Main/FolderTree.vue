<script lang="ts" setup>
import { onMounted,ref } from 'vue';

import usePath from '@/composable/PathComposable';
import useGithub from '@/composable/GithubComposable';
import { ItemKind, type ItemData, type TreeItem } from '@/types/Tree';

function getIcon(kind: ItemKind): string {
	return kind === ItemKind.folder ? 'gg-folder' : 'gg-file';
}

function push(child: ItemData) {
	let name = child.name
	if (child.kind === ItemKind.file) {
		name += ".md";
	}

	globalPath.stepForward(name)
	currentNode.value = github.getNodeFromPath(globalPath.path);
}

const globalPath = usePath();
const github = useGithub();
const currentNode = ref<TreeItem>( github.getNodeFromPath( globalPath.path ) )

</script>

<template>
	<main class="folder-grid">
		<template v-for="child in currentNode.children">
			<div @click="push(child)" :class="ItemKind[child.kind]">
				<i :class="getIcon(child.kind)"></i>
				<p class="node-text">{{ child.name }}</p>
			</div>
		</template>
	</main>
</template>

<style scoped>
.node-text {
	margin: 0;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 100%;
	white-space: nowrap;
}

.folder-grid {
	display: grid;
	grid-gap: 20px;
	grid-auto-rows: minmax(100px, 100px);

	grid-template-columns: repeat(3, calc((100% - 2 * 20px) / 3));
	user-select: none;
	overflow: auto;
	height: 100%;
}

.folder,
.file {
	border-radius: 1.5rem;
	padding: 12px;
	display: grid;
	place-items: center;
	transition: 0.3s;
	cursor:pointer;
}

.folder {
	border: solid 3px var(--blue);
}
.file {
	border: solid 3px var(--green);
}

.file:hover {
	background-color: var(--green);
}

.folder:hover {
	background-color: var(--blue);
}

.folder:hover *,
.file:hover * {
	color: var(--text-reverse) !important;
}

@media screen and (max-width: 500px) {
	.folder-grid {
		grid-template-columns: repeat(1, 100%);
	}
}
</style>
