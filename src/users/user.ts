import { bindable, EventAggregator, inject } from 'aurelia';
import { Rest } from '../util/rest';
import { UserData, UserListItemData } from './users-data';

@inject(EventAggregator, Rest)
export class User {
	@bindable public userListItem: UserListItemData;
	user: UserData;
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

		this.user = await this.rest.getUser(userLogin);
		this.isUserRetrieved = true;
	}

	public flipUser(): void {
		this.cardPanel?.classList.toggle(this.FLIPPED_CLASS);
	}
}
