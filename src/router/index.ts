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
			redirect: to => {
				return { path: '/lessons/' }
			  },
		},
		{
			path: '/lessons/:path(.*)',
			name: 'lessons_path',
			component: () => import('@/views/LessonView.vue'),
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
		{
			path: '/Planning',
			name: 'planning',
			component: () => import('@/views/Planning.vue'),
		},
	],
});

export default router;
