<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import FileContent from '@/components/Main/FileContent.vue';
import usePath from '@/composable/PathComposable';

let filepath = ref('');

onMounted(() => {
	let path = usePath().getFullPath();

	if(path.endsWith('.md')) {
		filepath.value = path;
	} else {
		throw new Error('You must specify a folder and a file in the url');
	}
});
</script>

<template>
	<FileContent :path="filepath" />
</template>