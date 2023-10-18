import { test as base } from '@playwright/test';
import { UserPage } from './user.page';

type UserFixtures = {
	userPage: UserPage
}

export const test = base.extend<UserFixtures>({
	userPage: async ({ page }, use): Promise<void> => {
		await use(new UserPage(page));
	}
});
