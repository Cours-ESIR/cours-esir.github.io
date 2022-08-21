<script setup lang="ts">

const props = defineProps<{
	planning: [];
}>();

let hours : number[] = [
    6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
]

document.documentElement.style.setProperty(
	'--hours',
	`${hours.at(-1)-hours[0]}`
);

</script>


<template>

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
                    <div v-for="event of day" :style="{top:`calc( 50px *${event.start-hours[0]})`,height: `calc( 50px *${event.duration})`}"></div>
                </column>
            </rowbody>
            <row-legend>
                <div class="lines" v-for="y of hours" :style="{top:`calc( 50px *${y-hours[0]})`}">
                    <span class="text">{{y%24}}h00</span>
                    <span class="line"></span>
                </div>
            </row-legend>
        </div-planning>
</template>

<style scoped>

    div-planning{
        width:100%;
        display: grid;
        position:relative;
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
        top:0px;
        border-bottom:1px solid var(--text);
        width: 100%;
        background-color: var(--background);
        z-index: 5;
        text-align: center;
    }

    div-planning > rowheader > column{
        margin: 20px 5px;
        width: calc(100% - 10px);
    }

    div-planning > row-legend{
        position: absolute;
        height: calc( 50px * var(--hours) );
        top:66px;
        z-index: -1;
    }

    div-planning > row-legend > .lines{
        position: absolute;
        right:0;
        width: 100%;
    }
    
    div-planning > row-legend > .lines > .text{
        transform: translate(-150%,-50%);
        position: absolute;
    }
    div-planning > row-legend > .lines > .line{
        border-top: 1px solid var(--text);
        top:0;
        display: block;
        width:100%;
    }

    column {
        width: 100%;
        text-overflow: '..';
        overflow: hidden;
    }

    column > * {
        background-color: var(--blue);
    }

    .events-list {
        position: relative;
        height: calc( 50px * var(--hours) );
    }
    .events-list > * {
        --decalage : 0.1em;
        border-radius: 0.6em;
        margin: 0 var(--decalage);
        width: calc(100% - var(--decalage)*2);
        position: absolute;
        left:0;
        background-color: var(--blue);
    }
</style>
