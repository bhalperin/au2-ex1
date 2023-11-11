import { HttpClient } from '@aurelia/fetch-client';
import { inject } from '@aurelia/kernel';
import { RepoLanguages, UserData, UserListItemData, UserRepo } from '../users/users.model';
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

	public async getUserRepos(user: string, page = 1, pageSize = 100): Promise<UserRepo[]> {
		this.http.baseUrl = 'https://api.github.com/users/';

		return this.http.fetch(`${user}/repos?per_page=${pageSize}&page=${page}`).then(response => response.json());
	}

	public async getAllUserRepos(user: string, repoCount: number): Promise<UserRepo[]> {
		const allRepos = [] as UserRepo[];
		let pageRepos = [] as UserRepo[];
		let page = 1;

		while (allRepos.length < repoCount) {
			pageRepos = await this.getUserRepos(user, page++);

			if (!pageRepos.length) {
				break;
			}
			allRepos.push(...pageRepos);
		}

		return allRepos;
	}

	public async getUserRepoLanguages(user: string, repo: string): Promise<RepoLanguages> {
		this.http.baseUrl = 'https://api.github.com/repos/';

		return this.http.fetch(`${user}/${repo}/languages`).then(response => response.json());
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
