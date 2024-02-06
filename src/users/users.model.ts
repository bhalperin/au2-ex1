export interface UserListItemData {
	avatar_url: string;
	html_url: string;
	id: number;
	login: string;
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
	description: string;
	full_name: string;
	id: number;
	html_url: string;
	name: string;
	owner: {
		login: string;
	}
	parent?: UserRepo;
	pushed_at: string;
	pushed_at_date: Date;
}

export interface RepoContributor {
	avatar_url: string;
	html_url: string;
	id: number;
	login: string;
}

export type RepoLanguages = Record<string, number>;
