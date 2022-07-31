<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import FileContent from '@/components/Main/FileContent.vue';
import router from '@/router/index';

const filepath = ref('');

onMounted(async () => {
	let queryParams = router.currentRoute.value.query;
	if('folder' in queryParams && 'file' in queryParams) {
		let file_name = queryParams.file as string;
		let folder_path = queryParams.folder as string;
		filepath.value = folder_path + '/' + file_name;
	} else if('filepath' in queryParams) {
		filepath.value = queryParams.filepath as string;
	} else {
		throw new Error('You must specify a folder and a file in the query');
	}
});
</script>

<template>
	<FileContent :path="filepath" />
</template>

<style scoped>
</style>
