<script lang="ts" setup>
import { ref, onUpdated } from 'vue';
import { page } from "@/services/format.js";

import GithubService from '@/services/GithubService';

const props = defineProps<{
    path: string,
}>();

const content = ref('');

let called = false

onUpdated(async () => {
    if(props.path !== '' && called == false) {
        let raw = await GithubService.fetchFileContent(props.path);
        content.value = page(raw);
        called = true
    }
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