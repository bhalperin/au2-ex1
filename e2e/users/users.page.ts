import { Locator, Page } from '@playwright/test';
import { USERS_RESPONSE } from '../mocks/users.mock';

export class UsersPage {
	readonly page: Page;
	readonly usersInPage: Locator;
	readonly nextButton: Locator;
	readonly firstUser: Locator;
	readonly lastUser: Locator;

	constructor(page: Page) {
		this.page = page;
		this.usersInPage = this.page.getByTestId('usersInPage');
		this.firstUser = this.page.getByTestId('firstUser');
		this.lastUser = this.page.getByTestId('lastUser');
		this.nextButton = this.page.getByRole('button', { name: /next/i });
	}

	async goto() {
		await this.page.route('https://api.github.com/users?since=0', async (route) =>
			route.fulfill({ json: USERS_RESPONSE.firstPage })
		);
		await this.page.route('https://api.github.com/users?since=3', async (route) =>
			route.fulfill({ json: USERS_RESPONSE.secondPage })
		);
		await this.page.goto('http://localhost:7000/users');
	}

	async clickNext() {
		await Promise.all([
			this.page.waitForResponse((response) => response.url().includes('users?since')),
			this.nextButton.click(),
		]);
	}

	async waitForLoaded() {
		await this.page.waitForFunction(() => !document.querySelector('.loading'));
	}

	async isLoading() {
		return await !!this.page.locator('.loading');
	}
}
