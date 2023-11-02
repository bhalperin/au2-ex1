export interface UserListItemData {
	avatar_url: string;
	html_url: string;
	id: number;
	login: string;
	name: string;
}

export interface UserData {
	avatar_url: string;
	bio: string;
	blog: string;
	html_url: string;
	id: number;
	location: string;
	login: string;
	name: string;
	public_repos: number;
}

export interface UserRepo {
	name: string;
}
