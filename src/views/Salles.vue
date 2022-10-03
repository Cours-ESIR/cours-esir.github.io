<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import type { SalleInfo } from '@/types/Salles';
import sallesComposable from '@/composable/sallesComposable';

function format(num: number) {
	let str = `${num}`;
	if (str.length === 1) {
		return '0' + str;
	}
	return str;
}

let now = new Date();
let year = now.getFullYear();
let month = format(now.getMonth() + 1);
let day = format(now.getDate());
let hour = format(now.getHours());
let minute = format(now.getMinutes());

let date = ref(year + '-' + month + '-' + day);
let time = ref(hour + ':' + minute);

let salles = ref<Record<string, SalleInfo>>({
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

let selected_date: Date;

function stringify_date(salle: SalleInfo) : string{
	if (salle.time == undefined) return 'updating';

	const tomorrow = new Date(selected_date);
	tomorrow.setDate(selected_date.getDate() + 1);
	
	if (salle.class === 'grey') {
		return `Indisponible`
	}
	else if ( selected_date.getDate() === salle.time.getDate() && selected_date.getMonth() === salle.time.getMonth()){
		return `Jusqu'à ${salle.time.getHours()}:${salle.time.getMinutes()}`
	}
	else if ( tomorrow.getDate() === salle.time.getDate() && tomorrow.getMonth() === salle.time.getMonth()){
		return `Jusqu'à demain ${salle.time.getHours()}:${salle.time.getMinutes()}`
	}
	else {
		return `Jusqu'au ${salle.time.getDate()}/${salle.time.getMonth()+1}`
	}
}

async function actualize() {
	selected_date = new Date(date.value + ' ' + time.value);
	const request = `&date=${selected_date.getTime()}`;
	salles.value = await sallesComposable().get_salles(salles.value, request);
}

onMounted(actualize);
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
				<template v-if="value.class !== 'grey'">
					<router-link :class="value.class + ' box'" :to="'/planning/'+name+'/'+value.time?.getTime()">
						{{ name }}
						<br>
						{{ stringify_date(value) }}
					</router-link>
				</template>
				<template v-else>
					<div :class="value.class + ' box'">
						{{ name }}
						<br>
						{{ stringify_date(value) }}
					</div>
				</template>
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
	color:var(--green);
}
.red {
	border: solid 3px var(--red);
	color:var(--red);
}

.red:hover,.green:hover {
	color:var(--blue);
}

@media screen and (max-width: 500px) {
	.grid {
		grid-template-columns: repeat(1, 100%);
	}
}
</style>