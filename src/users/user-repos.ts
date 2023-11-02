import { UserRepo } from './users.model';
import { bindable } from 'aurelia';

export class UserRepos {
	@bindable repos: UserRepo[];

	constructor() {}
}
