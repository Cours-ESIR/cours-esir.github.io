<script lang="ts" setup>
import CPlanning from "../components/Main/Planning_Component.vue";
import sallesComposable from '@/composable/sallesComposable';
import {ref} from "vue"
import router from "@/router"

let planning = ref([])
let date = parseInt(router.currentRoute.value.params.date);
let salle = router.currentRoute.value.params.salle;

(async () => {

    date = date - ( new Date(date).getDay() - 1 ) * 24 * 60 * 60 * 1000

    console.log(date)
    for ( let i=0;i<5;i++){
        let time = `&date=${date+i*24*60*60*1000}`
        let req = await sallesComposable().get_events(salle,time)
        if ( !req.error ){
            planning.value.push(req)
        }
        else {
            planning.value.push([])
        }
    }
})()


</script>

<template>
    <div style="display:block;">
        <CPlanning :planning="planning"></CPlanning>
    </div>
</template>
