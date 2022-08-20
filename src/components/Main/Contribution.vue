<script lang="ts" setup>

import useGithub from '@/composable/GithubComposable';
import {ref,onMounted} from "vue"

let data = ref([])


onMounted( async () => {
    data.value = useGithub().getContributors()
    console.log(data.value)
})

</script> 

<template>
    <div>
        <img v-for="user of data.value" style="display: inline-block; margin:7px;width: 50px; border-radius: 9em;" :title="user.login" :src="user.avatar_url"/>
    </div>
</template>