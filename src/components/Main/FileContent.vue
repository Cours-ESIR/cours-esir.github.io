<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

import GithubService from '@/services/GithubService';

const props = defineProps<{
    path: string,
}>();

const content = ref('');

watch(props, async(NewProps) => {
    let raw = await GithubService.fetchFileContent(NewProps.path);
    content.value = page(raw);
});

</script>

<template>
    <main v-html="content">
    </main>
</template>

<style scoped>
main {
    display: block;
    width: 100%;
    height: 100%;
    left: 0px;
    flex:auto;
}
</style>