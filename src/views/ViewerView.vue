<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import FileContent from '@/components/Main/FileContent.vue';
import router from '@/router';

const file_name = ref('');
const folder_path = ref('');

onMounted(async () => {
    folder_path.value = router.currentRoute.value.query.folder as string ?? "";
    file_name.value = router.currentRoute.value.query.file as string ?? "";
});

</script>

<template>
    <FileContent :path="folder_path + '/' + file_name" />
</template>

<style scoped>
</style>