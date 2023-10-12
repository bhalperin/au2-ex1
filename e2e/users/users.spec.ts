import { expect, test } from './users.fixture';
import { USERS_RESPONSE } from './users.mock';

test.beforeEach(async ({ page: usersPage }, testInfo) => {
	console.log('Running', `${testInfo.title}`);
	await usersPage.route('https://api.github.com/users?since=0', async route => route.fulfill({ json: USERS_RESPONSE.firstPage }));
	await usersPage.route('https://api.github.com/users?since=3', async route => route.fulfill({ json: USERS_RESPONSE.secondPage }));
	await usersPage.goto('http://localhost:9000/#/users');
});

test('title is "users"', async ({ page: usersPage }) => {
	// Expect a title to contain a substring.
	await expect(usersPage).toHaveTitle(/^users/i);
});

test('correct number of users in page', async ({ usersPage }) => {
	// Expects "next" button to be visible
	await expect(await usersPage.usersInPage.textContent()).toBe(`${USERS_RESPONSE.firstPage.length}`);
});

test('next button is visible', async ({ usersPage }) => {
	// Expects "next" button to be visible
	await usersPage.expectFirstUser(USERS_RESPONSE.firstPage[0].id);
});

test('when clicking next button show correct id range', async ({ usersPage }) => {
	await usersPage.clickNext();
	await usersPage.expectFirstUser(USERS_RESPONSE.secondPage[0].id);
});
