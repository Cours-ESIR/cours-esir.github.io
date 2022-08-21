<script lang="ts" setup>

    let planning = [
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}],
        [{"start":15.5,"duration":0.75}]
    ]

</script>

<template>
    <router style="display:block;">
        <div-planning>
            <rowheader>
                <column>Lundi</column>
                <column>Mardi</column>
                <column>Mercredi</column>
                <column>Jeudi</column>
                <column>Vendredi</column>
                <column>Samedi</column>
                <column>Dimanche</column>
            </rowheader>
            <rowbody>    
                <column class="events-list" v-for="day of planning">
                    <div v-for="event of day" :style="{top:'calc(200vh / 23 *'+event.start+')',height: 'calc(200vh / 23 *'+ event.duration+')'}"></div>
                </column>
            </rowbody>
        </div-planning>
    </router>
</template>

<style scoped>
    div-planning{
        width:100%;
        display: grid;
    }

    div-planning > * {
        display: block;
        width:100%;
        height: auto;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(7, 1fr);
    }

    div-planning > rowheader{
        position: sticky;
        padding-top:40px;
        top:0;
        border-bottom:1px solid var(--text);
        width: 100%;
        background-color: var(--background);
        z-index: 5;
        text-align: center;
    }

    column:not(column:nth-child(2n-1)){
        border-left:1px solid var(--text);
        border-right:1px solid var(--text);
    }

    column {
        width: 100%;
    }

    .events-list {
        position: relative;
        height: calc(200vh * 24/23);
    }
    .events-list > * {
        width: 100%;
        position: absolute;
        left:0;
        background-color: blue;
    }
</style>
