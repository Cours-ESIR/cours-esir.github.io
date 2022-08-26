<script lang="ts" setup>
import {ref} from 'vue'

type MenuItem = {
	title: string;
	route: string;
	class: string;
};

defineProps<{
	menuItems: MenuItem[];
}>();

let show = false

function invert_show() {
	show=!show

	if (show) {
		document.querySelector(".menu-container")?.classList.add("hide")
	}
	else  {
		document.querySelector(".menu-container")?.classList.remove("hide")
	}
}

</script>

<template>
	<nav class="menu-container">
		<template v-for="item of menuItems">
			<router-link :to="item.route" class="menu-item">
				<div class="icon-container"><i :class="item.class"></i></div>
				<p class="item-title">{{ item.title }}</p>
			</router-link>
		</template>
		<div id="show_btn" v-on:click="invert_show()"><i class="gg-chevron-left"></i></div>
	</nav>
</template>

<style scoped>
.menu-container {
	transition: 0.3s;
	color: var(--text);

	display: grid;
	grid-auto-flow: row;

	background-color: var(--compl);
	user-select: none;
}

.menu-container > .menu-item {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.menu-container > .menu-item > .icon-container {
	width: 65px;
	display: grid;
	place-items: center;
}

.menu-container > .menu-item > .item-title {
	flex: auto;
}

.menu-container > .menu-item:hover * {
	border-color: var(--red);
	color: var(--red);
	fill: var(--red);
}

.hide{
	margin-left:-200px;
}

.hide > #show_btn > i{
	transform: rotate(180deg);
}

#show_btn{
	transition: 0.3s;
	position: absolute;
	top:50%;
	margin-left:200px;
	transform:translateY(-50%);
	padding: 15px 5px;
	background: var(--compl);
	border-radius: 0 1em 1em 0;
}

@media screen and (max-width: 1200px) {
	#show_btn{
		display: none;
	}

	.hide{
		margin-left: unset;
	}

	.menu-container {
		grid-auto-flow: column;
	}

	.menu-container > .menu-item > .item-title {
		display: none;
	}

	.menu-container > .menu-item > .icon-container{
		width:unset;
		flex:auto;
	}
}
</style>
