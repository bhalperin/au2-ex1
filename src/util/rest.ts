import { RepoContributor, RepoLanguages, UserData, UserListItemData, UserRepo } from '../users/users.model';
import { WeatherResponse } from '../weather/weather.model';
import { EventAggregator, HttpClient, inject } from 'aurelia';

@inject(EventAggregator, HttpClient)
export class Rest {
	constructor(private ea: EventAggregator, private http: HttpClient) {
		http.configure(config => config
			.useStandardConfiguration()
			.withInterceptor({
				response(response, request) {
					ea.publish('api:github:rateLimit', false);
					console.log('request:', request, 'response:', response);

					return response;
				},
				responseError(error, request) {
					console.error('error:', error, '\nrequest:', request);

					if (error instanceof Response) {
						if (error.status === 403) {
							ea.publish('api:github:rateLimit', true);
							console.error('error: Github API calls rate limit exceeded');
							throw new Error('Github API calls rate limit exceeded');
						}
						throw new Error('unidentified error');
					}

					return null;
				}
			}));
	}

	public async getUsers(url: string): Promise<UserListItemData[]> {
		this.http.baseUrl = 'https://api.github.com/users';

		return this.http.fetch(url)
			.then(response => response.json())
			.catch(error => {
				console.error(error);
				return [];
			});
	}

	public async getUser(user: string): Promise<UserData> {
		this.http.baseUrl = 'https://api.github.com/users/';

		return this.http.fetch(user).then(response => response.json()).catch(() => null);
	}

	public async getUserRepos(user: string, page = 1, pageSize = 100): Promise<UserRepo[]> {
		this.http.baseUrl = 'https://api.github.com/users/';

		return this.http.fetch(`${user}/repos?per_page=${pageSize}&page=${page}`).then(async response => {
			const repos = await response.json() as unknown as UserRepo[];

			repos.forEach(repo => repo.pushed_at_date = new Date(repo.pushed_at));

			return repos;
		});
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

	public async getRepo(owner: string, repo: string): Promise<UserRepo> {
		this.http.baseUrl = 'https://api.github.com/repos/';

		return this.http.fetch(`${owner}/${repo}`).then(response => response.json());
	}

	public async getRepoContributors(owner: string, repo: string): Promise<RepoContributor[]> {
		this.http.baseUrl = 'https://api.github.com/repos/';

		return this.http.fetch(`${owner}/${repo}/contributors`).then(response => response.json()).catch(() => []);
	}

	public async getRepoLanguages(owner: string, repo: string): Promise<RepoLanguages> {
		this.http.baseUrl = 'https://api.github.com/repos/';

		return this.http.fetch(`${owner}/${repo}/languages`).then(response => response.json()).catch(() => {});
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
