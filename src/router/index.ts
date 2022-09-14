import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/erreur/:code',
			name: 'Erreur',
			component: () => import('@/views/NotFound.vue'),
		},
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
			path: '/salles',
			name: 'salles',
			component: () => import('@/views/Salles.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutView.vue'),
		},
		{
			path: '/planning/:salle/:date',
			name: 'planning',
			component: () => import('@/views/Planning.vue'),
		},
		{
			path: '/publisher',
			name: 'publisher1',
			component: () => import('@/views/publisher_home.vue'),
		},
		{
			path: '/publisher/:token',
			name: 'publisher2',
			component: () => import('@/views/publisher_view.vue'),
		},
	],
});

export default router;
