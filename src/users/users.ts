import { EventAggregator, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { UserData } from './users-data';

@inject(EventAggregator, Rest)
export class Users {
	public users;
	public selectedUser: UserData;
	private firstUser = 0;
	private lastUser = 0;

	constructor(private ea: EventAggregator, private rest: Rest) { }

	public created() {
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

		this.users = response.map(u => {
			return {
				avatarUrl: u.avatar_url,
				bio: u.bio,
				blog: u.blog,
				id: u.id,
				location: u.location,
				login: u.login,
				name: u.name
			};
		});
		if (this.users.length) {
			this.firstUser = this.users[0].id;
			this.lastUser = this.users[this.users.length - 1].id;
		}
	}

	public flipUsersToFront(): void {
		this.ea.publish('flipToFront');
	}
}
