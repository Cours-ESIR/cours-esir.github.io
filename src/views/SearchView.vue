<script lang="ts" setup>
import { ref } from 'vue';
import useGithub from '@/composable/GithubComposable';

const github = useGithub();

const input = ref('');
const list_filtered = ref<string[]>([]);

function filter() {
	let text = input.value.toUpperCase();

	if (text.length === 0) return;

	list_filtered.value = github.files.filter(file => {
		return file.toUpperCase().includes(text);
	});

}

</script>

<template>
	<main>
		<div class="input">
			<icon>
				<i class="gg-search"></i>
			</icon>
			<input v-model="input" @input="filter" />
		</div>
		<template v-for="file of list_filtered">
			<p>
				<router-link style="cursor:pointer" :to='"/lessons/"+file' class="menu-item">
					{{ file }}
				</router-link>
			</p>
		</template>
	</main>
</template>

<style scoped>
.input {
	display: flex;
	border: 3px solid var(--text);
	flex-wrap: nowrap;
	border-radius: 1.5rem;
	transition: 0.5s;
}

.input > *:nth-child(2) {
	all: unset;
	width: 100%;
	background-color: transparent;
	padding: 8px 0px;
	transition: 0.5s;
}

.input > *:nth-child(1) {
	width: 41px;
	display: grid;
	place-items: center;
}

i {
	transition: 0.5s;
}

.input:focus-within,
.input:hover {
	border: 3px solid var(--green);
}
.input:focus-within *,
.input:hover * {
	color: var(--green);
}
</style>
