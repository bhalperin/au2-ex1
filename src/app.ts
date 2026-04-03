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
			title: 'Users',
		},
		{
			path: 'geo',
			component: () => import('./geo/geo'),
			title: 'Geo',
		},
	],
})
export class App {}
