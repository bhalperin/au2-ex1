import { expect } from '@playwright/test';
import { USERS_DETAILS_RESPONSE, USERS_RESPONSE } from '../mocks/users.mock';
import { test } from './user.fixture';

test.beforeEach(async ({ userPage }, testInfo) => {
	console.log('Running', `${testInfo.title}`);
	await userPage.goto();
});

test('the first user card shows the first user', async ({ userPage }) => {
	await expect(await userPage.firstUserCardLogin()).toBe(USERS_RESPONSE.firstPage[0].login);
});

test.describe('when flipping the first user', () => {
	test.beforeEach(async ({ userPage }) => {
		await userPage.flipFirstUserCard();
	});

	test('the first user card shows the first user name', async ({ userPage }) => {
		await expect(await userPage.firstUserCardName()).toHaveText(USERS_DETAILS_RESPONSE[USERS_RESPONSE.firstPage[0].login].name);
	});

	test('the first user card shows a link to the first user blog and its title contains the blog url', async ({ userPage }) => {
		// then
		await expect(await userPage.firstUserCardBlogLink()).toHaveText('Blog');
		await expect(await userPage.firstUserCardBlogLink()).toHaveAttribute('data-bs-title', USERS_DETAILS_RESPONSE[USERS_RESPONSE.firstPage[0].login].blog);
	});
});
