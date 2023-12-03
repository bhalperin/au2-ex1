import { IRoute, IRouteableComponent } from '@aurelia/router';

export class App implements IRouteableComponent {
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
