<script lang="ts" setup>
import useGithub from '@/composable/GithubComposable';
const github = useGithub();
</script> 

<template>
    <div>
        <img v-for="user of github.contributors" style="display: inline-block; margin:7px;width: 50px; border-radius: 9em;" :title="user.login" :src="user.avatar_url"/>
    </div>
</template>