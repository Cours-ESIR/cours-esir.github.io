<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import sallesComposable from '@/composable/sallesComposable';
function format(num: number) {
	let str = `${num}`;
	if (str.length === 1) {
		return '0' + str;
	}
	return str;
}
let ndate = new Date();
let year = ndate.getFullYear();
let month = format(ndate.getMonth() + 1);
let day = format(ndate.getDate());
let hour = format(ndate.getHours());
let minute = format(ndate.getMinutes());
let date = ref(year + '-' + month + '-' + day);
let time = ref(hour + ':' + minute);
type ClassRecord = {
	[name: string]: { class: string , time?: number };
};
let salles = ref<ClassRecord>({
	'amphi-l': { class: 'grey' },
	'amphi-m': { class: 'grey' },
	'amphi-n': { class: 'grey' },
	'salle-001': { class: 'grey' },
	'salle-002': { class: 'grey' },
	'salle-003': { class: 'grey' },
	'salle-004': { class: 'grey' },
	'salle-101': { class: 'grey' },
	'salle-102': { class: 'grey' },
	'salle-103': { class: 'grey' },
	'salle-104': { class: 'grey' },
});
let timestamp:number
async function actualize() {
	timestamp = new Date(date.value + " " + time.value).getTime();
	let ntime:string = '&date=' + (timestamp).toString();
	salles.value = await sallesComposable().get_salles(salles.value,ntime)
}
onMounted(() => {
	actualize();
});
function stringify_date(time:number|undefined) : string{
	if (time == undefined) return "updating"
	let date_theo = new Date(timestamp)
	let date_time = new Date(time)
	const tomorrow = new Date(date_theo)
	tomorrow.setDate(tomorrow.getDate() + 1)
	if (time === 0) {
		return `La date n'est pas incluse dans ce planning`
	}
	else if ( date_theo.getDate() === date_time.getDate() && date_theo.getMonth() === date_time.getMonth()){
		return `Jusqu'à ${date_time.getHours()}:${date_time.getMinutes()}`
	}
	else if ( tomorrow.getDate() === date_time.getDate() && tomorrow.getMonth() === date_time.getMonth()){
		return `Jusqu'à demain ${date_time.getHours()}:${date_time.getMinutes()}`
	}
	else {
		return `Jusqu'au ${date_time.getDate()}/${date_time.getMonth()+1}`
	}
}
</script>

<template>
	<div>
		<div class="input">
			<input v-model="date" type="date" />
			<input v-model="time" type="time" />
			<button style="cursor:pointer" @click="actualize()">Change</button>
		</div>
		<main class="grid">
			<template v-for="(value, name) of salles">
				<div :class="value.class + ' box'">
					{{ name }}
					<br>
					{{ stringify_date(value.time) }}
				</div>
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
	background: unset;
	border: unset;
	color: unset;
	text-align: center;
	padding: 8px;
	transition: 0.5s;
	flex: 1;
	width: 100%;
	display: block;
	position: relative;
}
.input > *::-webkit-calendar-picker-indicator {
	top: 0;
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
	grid-template-columns: repeat(3, calc((100% - 2 * 20px) / 3));
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
.grey {
	border: solid 3px lightgrey;
}
.green {
	border: solid 3px var(--green);
}
.red {
	border: solid 3px var(--red);
}
@media screen and (max-width: 500px) {
	.grid {
		grid-template-columns: repeat(1, 100%);
	}
}
</style>