<script lang="ts" setup>
import CPlanning from "../components/Main/Planning_Component.vue";

let planning = [
    [{"start":15.5,"duration":0.75}],
    [{"start":15.5,"duration":0.75},{"start":9,"duration":0.5}],
    [{"start":15.5,"duration":0.75}],
    [{"start":15.5,"duration":0.75}],
    [{"start":15.5,"duration":0.75}],
    [{"start":15.5,"duration":0.75}],
    [{"start":15.5,"duration":0.75}],
];

</script>

<template>
    <router style="display:block;">
        <CPlanning :planning="planning"></CPlanning>
    </router>
</template>
