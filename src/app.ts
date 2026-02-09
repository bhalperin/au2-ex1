import { route } from '@aurelia/router';

@route({
	routes: [
		{
			path: ['', 'about'],
			component: () => import('./about/about'),
		},
		{
			path: 'users',
			component: () => import('./users/users'),
		},
		{
			path: 'geo',
			component: () => import('./geo/geo'),
		},
	],
})
export class App {}
