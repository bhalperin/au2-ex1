import { IRoute } from '@aurelia/router';

export class App {
	static routes = [
		{
			path: ['', 'about'],
			component: () => import('./about/about')
		},
		{
			path: 'users',
			component: () => import('./users/users')
		},
		{
			path: 'weather',
			component: () => import('./weather/weather')
		}
	] as IRoute[];
}
