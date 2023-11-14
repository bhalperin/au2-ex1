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
	id: number;
	name: string;
	html_url: string;
	languages: string;
	owner: {
		login: string;
	}
	pushed_at: string;
}

export interface RepoContributor {
	avatar_url: string;
	html_url: string;
	id: number;
	login: string;
}

export type RepoLanguages = Record<string, number>;
