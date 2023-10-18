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

test('when flipped, the first user card shows the first user name', async ({ userPage }) => {
	// when
	await userPage.flipFirstUserCard();

	// then
	await expect(await userPage.firstUserCardName()).toBe(USERS_DETAILS_RESPONSE[USERS_RESPONSE.firstPage[0].login].name);
});
