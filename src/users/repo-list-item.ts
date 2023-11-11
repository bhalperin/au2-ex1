import { bindable, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { UserData, UserRepo } from './users.model';

@inject(Rest)
export class RepoListItem {
	@bindable user: UserData;
	@bindable repo: UserRepo;
	languages: string | undefined;
	collapse: HTMLElement;

	constructor(private rest: Rest) {}

	attached(): void {
		this.collapse.addEventListener('show.bs.collapse', () => {
			if (this.languages === undefined) {
				this.getLanguages();
			}
		})
	}

	async getLanguages(): Promise<void> {
		const languagesResponse = await this.rest.getUserRepoLanguages(this.user.login, this.repo.name);

		this.languages = Object.keys(languagesResponse).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join(', ') || 'N/A';
	}
}
