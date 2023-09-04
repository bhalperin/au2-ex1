import { EventAggregator, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { UserData, UserListItemData } from './users-data';

@inject(EventAggregator, Rest)
export class Users {
	public users = [] as UserListItemData[];
	public selectedUser: UserListItemData;
	private firstUser = 0;
	private lastUser = 0;

	constructor(private ea: EventAggregator, private rest: Rest) { }

	public created(): void {
		this.subscribe();
	}

	public attached(): void {
		this.getUsers();
	}

	public subscribe(): void {
		this.ea.subscribe('userSelected', (user: UserData) => {
			this.selectedUser = user;
		});
	}

	public async getUsers(): Promise<void> {
		const response = await this.rest.getUsers(`?since=${this.lastUser}`);

		this.users = response;
		if (this.users.length) {
			this.firstUser = this.users[0].id;
			this.lastUser = this.users[this.users.length - 1].id;
			// this.selectedUser = this.users[0];
		}
	}

	public flipUsersToFront(): void {
		this.ea.publish('flipToFront');
	}
}
