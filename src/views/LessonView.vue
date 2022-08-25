<script lang="ts" setup>
import FolderTree from '@/components/Main/FolderTree.vue';
import usePath from '@/composable/PathComposable';
import ViewerView from '@/components/Main/ViewerView.vue';

import router from "@/router"

const path = usePath();



let prev = router.options.history.state.back?.toString() ?? ""

if (!prev.startsWith("/lessons")){
	path.loadPath()
}


</script>

<template>
	<ViewerView v-if="path.getFullPath().endsWith('.md')"></ViewerView>
	<FolderTree v-else/>
</template>

<style scoped></style>
