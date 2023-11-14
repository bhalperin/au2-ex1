import { bindable, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { RepoContributor, UserData, UserRepo } from './users.model';

@inject(Rest)
export class RepoListItem {
	@bindable user: UserData;
	@bindable repo: UserRepo;
	contributors: RepoContributor[];
	languages: string | undefined;
	sortedLanguages = [] as [string, number][];
	totalLanguages = 0;
	collapse: HTMLElement;

	constructor(private rest: Rest) {}

	attached(): void {
		this.collapse.addEventListener('show.bs.collapse', () => {
			if (this.languages === undefined) {
				this.getContributors();
				this.getLanguages();
			}
		})
	}

	async getContributors(): Promise<void> {
		this.contributors = (await this.rest.getRepoContributors(this.repo.owner.login, this.repo.name)).filter(c => c.login !== this.repo.owner.login);
	}

	async getLanguages(): Promise<void> {
		const languagesResponse = await this.rest.getRepoLanguages(this.repo.owner.login, this.repo.name);

		this.sortedLanguages = Object.entries(languagesResponse).sort((a, b) => b[1] - a[1]);
		console.log('sortred languages:', this.sortedLanguages);
		this.totalLanguages = Object.values(languagesResponse).reduce((acc, current) => acc + current, 0);
		this.languages = Object.keys(languagesResponse).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join(', ') || 'N/A';
	}
}
