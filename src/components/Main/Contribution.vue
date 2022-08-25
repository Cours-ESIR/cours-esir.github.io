<script lang="ts" setup>

import useGithub, { type contribList } from '@/composable/GithubComposable';
import { ref, onMounted } from 'vue';

let data = ref<contribList[]>([]);

onMounted( async () => {
    data.value = useGithub().getContributors();
});
</script> 

<template>
    <div>
        <img v-for="user of data" style="display: inline-block; margin:7px;width: 50px; border-radius: 9em;" :title="user.login" :src="user.avatar_url"/>
    </div>
</template>