import { expect } from '@playwright/test';
import { USERS_RESPONSE } from '../mocks/users.mock';
import { test } from './users.fixture';

test.beforeEach(async ({ usersPage }, testInfo) => {
	console.log('Running', `${testInfo.title}`);
	await usersPage.goto();
});

test('page title is "users"', async ({ usersPage }) => {
	await expect(usersPage.page).toHaveTitle(/^users/i);
});

test('correct number of users in page', async ({ usersPage }) => {
	await expect(await usersPage.usersInPage.textContent()).toBe(`${USERS_RESPONSE.firstPage.length}`);
});

test('when page loads show correct id range', async ({ usersPage }) => {
	// when
	await usersPage.waitForLoaded();

	// then
	await expect(await usersPage.firstUser.textContent()).toBe(`${USERS_RESPONSE.firstPage[0].id}`);
});

test('when clicking next button show correct id range', async ({ usersPage }) => {
	// when
	await usersPage.clickNext();
	await usersPage.waitForLoaded();

	// then
	await expect(await usersPage.firstUser.textContent()).toBe(`${USERS_RESPONSE.secondPage[0].id}`);
});
