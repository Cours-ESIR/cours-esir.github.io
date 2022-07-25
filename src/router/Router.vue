<script lang="ts">

import AboutView from '@/views/AboutView.vue'
import SearchView from '@/views/SearchView.vue'
import EditView from '@/views/EditView.vue'
import HomeView from '@/views/HomeView.vue'
import LessonView from '@/views/LessonView.vue'
import ViewerView from '@/views/ViewerView.vue'

import NotFound from '@/views/NotFound.vue'

 const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/lessons',
		name: 'lessons',
		component: LessonView
	},
	{
		path: '/viewer',
		name: 'viewer',
		component: ViewerView
	},
	{
		path: '/search',
		name: 'search',
		component: SearchView
	},
	{
		path: '/edit',
		name: 'edit',
		component: EditView
	},
	{
		path: '/about',
		name: 'about',
		component: AboutView
	}
]

export default {
	set(route){
		document.location.hash = "#" + route
	},
	path(){
		return window.location.hash.slice(1).split("?")[0]
	},
	
  data() {
    return {
		currentPath : window.location.hash.substring(1),
		find : (route) => {
			route = route.split("?")[0]
			for (let item of routes){
				if (route === item.path) {
					return item.component
				}
			}
			return NotFound
		}
    }
  },
  computed: {
    currentView() {
    	return this.find(this.currentPath || '/')
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		this.currentPath = window.location.hash.substring(1)
	})
  }
}

</script>

<template>
	<component  :is="currentView"/>
</template>