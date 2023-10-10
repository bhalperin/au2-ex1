import { UserData } from '@/users';

export const USERS_RESPONSE = {
	firstPage: [
		{
			"login": "mojombo",
			"id": 1,
			"avatar_url": "https://avatars.githubusercontent.com/u/1?v=4"
		},
		{
			"login": "defunkt",
			"id": 2,
			"avatar_url": "https://avatars.githubusercontent.com/u/2?v=4"
		},
		{
			"login": "pjhyett",
			"id": 3,
			"avatar_url": "https://avatars.githubusercontent.com/u/3?v=4"
		}
	] as UserData[],
	secondPage: [
		{
			"login": "wycats",
			"id": 4,
			"avatar_url": "https://avatars.githubusercontent.com/u/4?v=4"
		},
		{
			"login": "ezmobius",
			"id": 5,
			"avatar_url": "https://avatars.githubusercontent.com/u/5?v=4"
		},
		{
			"login": "ivey",
			"id": 6,
			"avatar_url": "https://avatars.githubusercontent.com/u/6?v=4"
		}
	] as UserData[]
};
