<script lang="ts" setup>
import { ref } from 'vue';
import Menu from '@/components/Navigation/Menu.vue';
import Topbar from '@/components/Header/Topbar.vue';
import type { RouteRecordName } from 'vue-router';

import Router from './router/Router.vue';

const items = ref([
	{
		title: 'Accueil',
		route: '/',
		class: 'gg-home'
	},
	{
		title: 'Cours',
		route: '/lessons',
		class: 'gg-briefcase'
	},
	{
		title: 'Recherche',
		route: '/search',
		class: 'gg-search'
	},
	{
		title: 'Modification',
		route: '/edit',
		class: 'gg-pen'
	},
	{
		title: 'Informations',
		route: '/about',
		class: 'gg-info'
	}
]);

function isRequired(routeName: string|RouteRecordName|null|undefined): boolean {
	if(typeof routeName !== 'string') {
		return false;
	}
	let menus = ['lessons', 'edit', 'viewer'];
	return menus.includes(routeName);
}


</script>

<template>
	<div id="content">
		<Topbar id="topbar" class="no-print" />
		<div id="router_par">
			<Router id="router"/>
		</div>
	</div>
	<Menu class="no-print" id="menu" :menu-items="items"></Menu>
	
</template>

<style>

@import "style/main.css";

#app {
  	display: flex;
	flex-direction: row-reverse;
	width:100%;
	height: 100%;
}


#content {
	flex: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
}

#router_par {
	width: 100%;
	overflow:auto;
	flex: auto;
}

#router{
	padding:20px;
	margin: auto;
	width: clamp(100px,calc(100% - 40px),595px);
	height: auto;
}

#menu {
  	min-width: 200px;
	float:left;
}

#topbar {
	width:unset;
	height: 40px;
	padding:20px;
}

@media screen and (max-width: 1200px) {
	#app {
		flex-direction: column;
	}

  	#menu {
		width:unset;
		height: 80px;
  	}

	#content{
		height: calc( 100% - 80px );
	}
}

</style>