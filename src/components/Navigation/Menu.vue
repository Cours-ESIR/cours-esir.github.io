<script lang="ts" setup>
type MenuItem = {
	title: string;
	route: string;
	class: string;
};

defineProps<{
	menuItems: MenuItem[];
}>();
</script>

<template>
	<nav class="menu-container">
		<template v-for="item of menuItems">
			<a @click="$router.push(item.route)" class="menu-item">
				<div class="icon-container"><i :class="item.class"></i></div>
				<p class="item-title">{{ item.title }}</p>
			</a>
		</template>
	</nav>
</template>

<style scoped>
.menu-container {
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
	flex: 20px;
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

@media screen and (max-width: 1200px) {
	.menu-container {
		grid-auto-flow: column;
	}

	.menu-container > .menu-item > .item-title {
		display: none;
	}
}
</style>
