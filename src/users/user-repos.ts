import { bindable } from 'aurelia';
import { UserData, UserRepo } from './users.model';

export class UserRepos {
	@bindable user: UserData;
	@bindable repos: UserRepo[];

	constructor() {}
}
