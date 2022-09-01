<script lang="ts" setup>
import CPlanning from "../components/Main/Planning_Component.vue";
import sallesComposable from '@/composable/sallesComposable';
import {ref} from "vue"

let planning = ref([

]);

let salle = "salle-001";
let date:number = (new Date()).getTime();
(async () => {

    for ( let i=0;i<5;i++){
        let time = `&date=${date+24*60*60*1000}`
        planning.value.push( await sallesComposable().get_events(salle,time) )
    }

})()

</script>

<template>
    <router style="display:block;">
        <CPlanning :planning="planning"></CPlanning>
    </router>
</template>
