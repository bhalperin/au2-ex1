import { test as base } from '@playwright/test';
import { UsersPage } from './users.page';

type UsersFixtures = {
	usersPage: UsersPage
}

export const test = base.extend<UsersFixtures>({
	usersPage: async ({ page }, use): Promise<void> => {
		await use(new UsersPage(page));
	}
});

export { expect } from '@playwright/test';
