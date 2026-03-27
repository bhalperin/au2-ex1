import { bindable } from 'aurelia';
import { UserData, UserRepo } from './users.model';

export class UserRepos {
	@bindable user = null as UserData | null;
	@bindable repos = [] as UserRepo[];

	constructor() {}
}
