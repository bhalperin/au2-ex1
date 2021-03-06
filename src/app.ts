import { IRouteViewModel, Routeable } from 'aurelia';
import { About } from './about/about';
import { Users } from './users/users';
import { Weather } from './weather/weather';

export class App implements IRouteViewModel {
	static routes: Routeable[] = [
		{
			path: ['', 'about'],
			component: About
		},
		{
			path: 'users',
			component: Users
		},
		{
			path: 'weather',
			component: Weather
		}
	];
}
