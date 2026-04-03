import { bindable, EventAggregator, inject } from 'aurelia';
import * as bootstrap from 'bootstrap';
import { Rest } from '../util/rest';
import { UserData, UserListItemData, UserRepo } from './users.model';

@inject(EventAggregator, Rest)
export class User {
	#ea: EventAggregator;
	#rest: Rest;
	@bindable public userListItem!: UserListItemData;
	readonly #FLIPPED_CLASS = 'is-flipped';
	#isUserRetrieved = false;
	user?: UserData;
	userRepos = [] as UserRepo[];
	private cardPanel!: HTMLElement;
	private reposModal!: HTMLElement;

	constructor(ea: EventAggregator, rest: Rest) {
		this.#ea = ea;
		this.#rest = rest;
	}

	async #getUser() {
		if (this.#isUserRetrieved) {
			return;
		}

		this.user = await this.#rest.getUser(this.userListItem.login);
		this.#isUserRetrieved = true;
	}

	#flipUser() {
		this.cardPanel?.classList.toggle(this.#FLIPPED_CLASS);
		this.#enableTooltip();
	}

	#enableTooltip() {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

		tooltipTriggerList.forEach((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
	}

	public created() {
		this.subscribe();
	}

	public attached() {
		this.#isUserRetrieved = false;
		this.#enableTooltip();
		this.reposModal.addEventListener('show.bs.modal', async () => {
			if (this.user && !this.userRepos.length) {
				this.userRepos = await this.#rest.getAllUserRepos(this.user.login, this.user.public_repos);
			}
		});
	}

	public subscribe() {
		this.#ea.subscribe('flipToFront', () => {
			this.cardPanel?.classList.remove(this.#FLIPPED_CLASS);
		});
	}

	public publish(user: UserData) {
		this.#ea.publish('userSelected', user);
	}

	public async flipClicked(ev: MouseEvent, frontClicked: boolean) {
		ev.stopPropagation();
		bootstrap.Tooltip.getInstance(ev.target as HTMLElement)?.hide();

		if (frontClicked) {
			await this.#getUser();
		}

		this.#flipUser();
	}
}
