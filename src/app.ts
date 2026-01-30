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
			path: 'weather',
			component: () => import('./weather/weather'),
		},
	],
})
export class App {}
