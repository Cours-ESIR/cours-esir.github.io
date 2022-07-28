<script lang="ts" setup>
import { onMounted, ref } from 'vue'


let salles = ref({
    "amphi-l":{"class":"grey"},
    "amphi-m":{"class":"grey"},
    "amphi-n":{"class":"grey"},
    "salle-001":{"class":"grey"},
    "salle-002":{"class":"grey"},
    "salle-003":{"class":"grey"},
    "salle-004":{"class":"grey"},
    "salle-101":{"class":"grey"},
    "salle-102":{"class":"grey"},
    "salle-103":{"class":"grey"},
    "salle-104":{"class":"grey"},
})

function format(num){
    let str = num.toString()
    if (str.length === 1){
        return "0" + str
    }
    return str
}

let ndate = (new Date())
let year = ndate.getFullYear()
let month = format((ndate.getMonth())+1)
let day = format(ndate.getDate())
let hour = format(ndate.getHours())
let minute = format(ndate.getMinutes())

let date = ref( year + "-" + month + "-" + day)
let time = ref( hour + ":" + minute )

async function actualize() {
    for (let salle in salles.value){
        let date_milli = (new Date(date.value)).getTime() 
        let time_split = time.value.split(":")
        let time_milli = parseInt(time_split[0]) * 60 * 60 * 1000 + parseInt(time_split[1]) * 60 * 1000

        let ntime = "&time=" + (time_milli + date_milli).toString()

        let res = await fetch("https://api-aquabx.vercel.app/api/sallesESIR?salles="+JSON.stringify([salle])+"&type=libres"+ntime)
        let data = await res.json()

        let classe

        if (data[salle]["erreur"]) {
            break
        }
        else if(data[salle]["state"]){
            salles.value[salle]["class"] = "green"
        }
        else{
            salles.value[salle]["class"] = "red"
        }
    }
}

onMounted( () => {
    actualize()
})

</script>

<template>
    <div>
        <div class="input">
            <input v-model="date" type="date"/>
            <input v-model="time" type="time"/>
            <button @click="actualize()">Change</button>
        </div>
        <main class="grid">
            <template v-for="(value, name) of salles">
                <div :class="value.class + ' box'">{{name}}</div>
            </template>
        </main>
    </div>
</template>

<style scoped>

.input {
    display: flex;
    flex-wrap: nowrap;
    border-radius: 1.5rem;
    transition: 0.5s;
    overflow: hidden;
    border: 3px solid var(--text);
}

.input > * {
    background:unset;
    border:unset;
    color:unset;
    text-align: center;
    padding: 8px;
    transition: 0.5s;
    flex:1;
    width:100%;
    display: block;
    position: relative;
}

.input > *::-webkit-calendar-picker-indicator {
    top:0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
}

.grid {
    display: grid;
    grid-gap: 20px;
    grid-auto-rows: minmax(100px, 100px);

    grid-template-columns: repeat(3, calc( ( 100% - 2 * 20px ) / 3 ));

    overflow: auto;
    height: 100%;
}

.box {
    border-radius: 1.5rem;
    padding: 12px;
    display: grid;
    place-items: center;
    transition: 0.3s;
}

.grey{
    border: solid 3px lightgrey;
}

.green{
    border: solid 3px var(--green);
}

.red{
    border: solid 3px var(--red);
}

</style>