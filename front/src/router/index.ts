import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue')
		},
		{
			path: '/lessons',
			name: 'lessons',
			component: () => import('@/views/LessonView.vue')
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('@/views/SearchView.vue')
		},
		{
			path: '/edit',
			name: 'edit',
			component: () => import('@/views/EditView.vue')
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutView.vue')
		}
	]
});

export default router;