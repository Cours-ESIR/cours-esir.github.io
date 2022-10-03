<script lang="ts" setup>
import Week from '@/components/Main/Week.vue';
    
import { ref } from 'vue';
import router from "@/router";

import sallesComposable from '@/composable/sallesComposable';

import type { event } from '@/types/Planning';

const planning = ref<event[][]>([]);
const salle = router.currentRoute.value.params.salle as string;

let date = parseInt(router.currentRoute.value.params.date as string);

(async () => {

    date = date - ( new Date(date).getDay() - 1 ) * 24 * 60 * 60 * 1000

    console.log(date)
    for ( let i=0;i<5;i++){
        let time = `&date=${date+i*24*60*60*1000}`
        let response = await sallesComposable().get_events(salle, time)
        if ( !response.error ){
            planning.value.push(response)
        }
        else {
            planning.value.push([])
        }
    }
})()


</script>

<template>
    <div style="display:block;">
        <Week :planning="planning"></Week>
    </div>
</template>
