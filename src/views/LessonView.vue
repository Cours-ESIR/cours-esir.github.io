<script lang="ts" setup>

import FolderTree from '@/components/Main/FolderTree.vue';
import usePath from '@/commposable/PathComposable';

const path = usePath();

</script>

<template>
        <FolderTree :key="path.getFullPath()"/>
</template>

<style scoped>
</style>
