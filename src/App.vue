<script lang="ts" setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Menu from '@/components/Navigation/Menu.vue';
import Topbar from '@/components/Header/Topbar.vue';
import router from '@/router/index';

const items = ref([
	{
		title: 'Accueil',
		route: '/',
		class: 'gg-home',
	},
	{
		title: 'Cours',
		route: '/lessons',
		class: 'gg-briefcase',
	},
	{
		title: 'Recherche',
		route: '/search',
		class: 'gg-search',
	},
	// {
	// 	title: 'Modification',
	// 	route: '/edit',
	// 	class: 'gg-pen',
	// },
	{
		title: 'Salles',
		route: '/salles',
		class: 'gg-calendar',
	},
	{
		title: 'Informations',
		route: '/about',
		class: 'gg-info',
	},
]);

function isRequired(routeName: string): boolean {
	let menus = ['/lessons', '/edit', '/viewer'];
	for (let menu of menus){
		if ( routeName.startsWith(menu) ){
			return true
		}
	}
	return false;
}



router.afterEach((to:{path:string}, from:{path:string}) => {
	let order = {
		"home":0,
		"lessons":1,
		"search":2,
		"salles":3,
		"about":4,
	}

	let pathfrom = (from.path == "/") ? "home" : from.path.split('/')[1]
	let pathto = (to.path == "/") ? "home" : to.path.split('/')[1]

	let toDepth = order[pathfrom]
  	let fromDepth = order[pathto]


	if (fromDepth == toDepth){
		toDepth = to.path.split('/').filter(v=>v!=="").length
  		fromDepth = from.path.split('/').filter(v=>v!=="").length
	}

  	to.meta.transitionName = toDepth < fromDepth ? 'slideL' : 'slideR'
})

</script>

<template>
	<div id="content">
		<router-view v-slot="{ Component, route }">

			<Topbar id="topbar" v-if="isRequired($route.path)" class="no-print" />
			<div id="router_par">
				<Transition :name="route.meta.transitionName">
					<component id="router" :key="$route.fullPath" :is="Component" />
				</Transition>
			</div>
  		</router-view>
	</div>
	<Menu class="no-print" id="menu" :menu-items="items"></Menu>
</template>

<style>

.slideL-enter-active,.slideR-enter-active{
	transition: opacity 0.5s,transform 0.5s;
}

.slideL-leave-to,.slideR-leave-to{
	display: none;
}

.slideL-enter-from{
	transform: translateX(-50px);
	opacity: 0;
}

.slideR-enter-from {
	transform: translateX(+50px);
	opacity: 0;
}


#app {
	display: flex;
	flex-direction: row-reverse;
	width: 100%;
	height: 100%;
}

#content {
	flex: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
<style>
#router_par {
	width: 100%;
	overflow: hidden auto;
	flex: auto;
	position: relative;
}

#router {
	padding: 40px 20px;
	margin: auto;
	width: clamp(100px, calc(100% - 40px), 19cm);
	height: auto;
}

#menu {
	min-width: 200px;
	float: left;
}

#topbar {
	width: unset;
	height: 40px;
	padding: 20px;
}

@media screen and (max-width: 1200px) {
	#app {
		flex-direction: column;
	}

	#menu {
		width: unset;
		height: 80px;
	}

	#content {
		height: calc(100% - 80px);
	}
}
</style>
