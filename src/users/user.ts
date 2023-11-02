import { bindable, EventAggregator, inject } from 'aurelia';
import * as bootstrap from 'bootstrap';
import { Rest } from '../util/rest';
import { UserData, UserListItemData, UserRepo } from './users.model';

@inject(EventAggregator, Rest)
export class User {
	@bindable public userListItem: UserListItemData;
	readonly #FLIPPED_CLASS = 'is-flipped';
	#isUserRetrieved = false;
	user: UserData;
	userRepos = [] as UserRepo[];
	private cardPanel: HTMLElement;
	private reposModal: HTMLElement;

	constructor(private ea: EventAggregator, private rest: Rest) { }

	async #getUser(): Promise<void> {
		if (this.#isUserRetrieved) {
			return;
		}

		console.log(this.userRepos);
		this.user = await this.rest.getUser(this.userListItem.login);
		this.#isUserRetrieved = true;
	}

	#flipUser(): void {
		this.cardPanel?.classList.toggle(this.#FLIPPED_CLASS);
		this.#enableTooltip();
	}

	#enableTooltip(): void {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

		tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
	}

	public created() {
		this.subscribe();
	}

	public attached() {
		this.#isUserRetrieved = false;
		this.#enableTooltip();
		this.reposModal.addEventListener('show.bs.modal', async (event) => {
			if (!this.userRepos.length) {
				this.userRepos = await this.rest.getAllUserRepos(this.userListItem.login);
			}
			console.log(event);
		});
	}

	public subscribe(): void {
		this.ea.subscribe('flipToFront', () => {
			this.cardPanel?.classList.remove(this.#FLIPPED_CLASS);
		});
	}

	public publish(user): void {
		this.ea.publish('userSelected', user);
	}

	public async flipClicked(ev: MouseEvent, frontClicked: boolean): Promise<void> {
		ev.stopPropagation();
		bootstrap.Tooltip.getInstance(ev.target as HTMLElement).hide();

		if (frontClicked) {
			await this.#getUser();
		}

		this.#flipUser();
	}
}
