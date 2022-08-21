<script lang="ts" setup>
    import Planning_Component from "../components/Main/Planning_Component.vue";

    let planning = [
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":0,"duration":1.75}],
        [{"start":23,"duration":1}]
    ]

</script>

<template>
    <router style="display:block;">
        <Planning_Component :planning="planning"></Planning_Component>
    </router>
</template>
