import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/lessons',
			name: 'lessons',
			component: () => import('@/views/LessonView.vue'),
		},
		{
			path: '/viewer',
			name: 'viewer',
			component: () => import('@/views/ViewerView.vue'),
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('@/views/SearchView.vue'),
		},
		{
			path: '/edit',
			name: 'edit',
			component: () => import('@/views/EditView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutView.vue'),
		},
		{
			path: '/salles',
			name: 'salles',
			component: () => import('@/views/Salles.vue'),
		},
	],
});

export default router;
