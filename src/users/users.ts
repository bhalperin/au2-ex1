import { EventAggregator, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { UserData, UserListItemData } from './users.model';

@inject(EventAggregator, Rest)
export class Users {
	#ea: EventAggregator;
	#rest: Rest;
	public users = [] as UserListItemData[];
	public selectedUser?: UserListItemData;
	private firstUser = 0 as number | undefined;
	private lastUser = 0 as number | undefined;
	private isLoading = true;
	private apiError = false;

	constructor(ea: EventAggregator, rest: Rest) {
		this.#ea = ea;
		this.#rest = rest;
	}

	public created() {
		this.subscribe();
	}

	public attached() {
		this.getUsers();
	}

	public subscribe() {
		this.#ea.subscribe('userSelected', (user: UserData) => {
			this.selectedUser = user;
		});
		this.#ea.subscribe('api:github:rateLimit', (error: boolean) => {
			this.apiError = error;
		});
	}

	public async getUsers() {
		this.isLoading = true;

		const response = await this.#rest.getUsers(`?since=${this.lastUser}`);

		this.users = response;
		if (this.users.length) {
			this.firstUser = this.users[0]?.id;
			this.lastUser = this.users[this.users.length - 1]?.id;
			// this.selectedUser = this.users[0];
		}

		this.isLoading = false;
	}

	public flipUsersToFront() {
		this.#ea.publish('flipToFront');
	}
}
