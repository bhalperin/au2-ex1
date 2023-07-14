import { bindable, EventAggregator, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { UserData } from './users-data';

@inject(EventAggregator, Rest)
export class User {
	@bindable public user: UserData;
	private cardPanel: Element;
	private isUserRetrieved = false;
	private readonly FLIPPED_CLASS: string = 'is-flipped';

	constructor(private ea: EventAggregator, private rest: Rest) { }

	public created() {
		this.subscribe();
	}

	public attached() {
		this.isUserRetrieved = false;
	}

	public subscribe(): void {
		this.ea.subscribe('flipToFront', () => {
			this.cardPanel?.classList.remove(this.FLIPPED_CLASS);
		});
	}

	public publish(user): void {
		this.ea.publish('userSelected', user);
	}

	public async getUser(userLogin: string): Promise<void> {
		this.flipUser();

		if (this.isUserRetrieved) {
			return;
		}

		const user = await this.rest.getUser(userLogin);

		this.user = {
			avatarUrl: user.avatar_url,
			bio: user.bio ?? '',
			blog: user.blog,
			id: user.id,
			location: user.location,
			login: user.login,
			name: user.name
		} as UserData;
		// this.publish(this.user);
		this.isUserRetrieved = true;
	}

	public flipUser(): void {
		this.cardPanel?.classList.toggle(this.FLIPPED_CLASS);
	}
}
