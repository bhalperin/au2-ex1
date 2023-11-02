import { Locator, Page } from '@playwright/test';
import { USERS_DETAILS_RESPONSE, USERS_RESPONSE } from '../mocks/users.mock';

export class UserPage {
	readonly page: Page;
	readonly firstUserId = USERS_RESPONSE.firstPage[0].id;
	readonly firstUserLogin = USERS_RESPONSE.firstPage[0].login;
	firstUserCard: Locator;
	userCards: Locator;

	constructor(page: Page) {
		this.page = page;
		this.userCards = this.page.locator('user');
		this.firstUserCard = this.page.getByTestId(`user-${this.firstUserId}`);
	}

	async goto(): Promise<void> {
		await this.page.route('https://api.github.com/users?since=0', async route => route.fulfill({ json: USERS_RESPONSE.firstPage }));
		await this.page.route(`https://api.github.com/users/${this.firstUserLogin}`, async route => route.fulfill({ json: USERS_DETAILS_RESPONSE[this.firstUserLogin] }));
		await this.page.goto('http://localhost:9000/#/users');
		await Promise.all([
			this.page.waitForResponse(response => response.url().includes('users?since'))
		]);
	}

	async firstUserCardLogin(): Promise<string> {
		return (await this.firstUserCard.locator('.card .card-body .card-title').textContent()).trim();
	}

	firstUserCardName(): Locator {
		return this.firstUserCard.locator('.card.back .card-body .card-title.user-name');
	}

	firstUserCardBlogLink(): Locator {
		return this.firstUserCard.locator('.card.back .card-body .user-blog a');
	}

	async flipFirstUserCard(): Promise<void> {
		await this.fliptUserCard(1);
	}

	async fliptUserCard(serial: number): Promise<void> {
		const userCard = this.page.getByTestId(`user-${serial}`);
		const responsePromise =  this.page.waitForResponse(response => response.url().includes('users/'));

		await userCard.getByTestId('flipToBack').click();
		await responsePromise;
	}

	async isLoading(): Promise<boolean> {
		return await !!this.page.locator('.loading');
	}
}
