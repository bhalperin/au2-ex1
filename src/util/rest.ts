import { HttpClient } from '@aurelia/fetch-client';
import { inject } from '@aurelia/kernel';
import { UserData, UserListItemData } from '../users/users.model';
import { WeatherResponse } from '../weather/weather.model';

@inject(HttpClient)
export class Rest {
	constructor(public http: HttpClient) {
		http.configure(config => config.useStandardConfiguration());
	}

	public async getUsers(url: string): Promise<UserListItemData[]> {
		this.http.baseUrl = 'https://api.github.com/users';

		return this.http.fetch(url).then(response => response.json());
	}

	public async getUser(user: string): Promise<UserData> {
		this.http.baseUrl = 'https://api.github.com/users/';

		return this.http.fetch(user).then(response => response.json());
	}

	public getWeatherCurrentGeosearch(key: string, params: string): Promise<WeatherResponse> {
		const url = `?key=${key}&city=${params}`;
		this.http.baseUrl = 'http://api.weatherbit.io/v2.0/current';

		return this.http.fetch(url)
			.then(response => {
				if (response.status === 200) {
					return response.json();
				}
				throw new Error('Invalid city');
			})
			.catch((error: Response) => {
				console.error(error);
				throw new Error(error.statusText);
			});
	}

	public getWeatherIconUrl(key: string, icon: string): string {
		const url = `https://www.weatherbit.io/static/img/icons/${icon}.png?key=${key}`;

		return url;
	}
}
