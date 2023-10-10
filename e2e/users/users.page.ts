import { Locator, Page, expect } from "@playwright/test";

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

	async goto(): Promise<void> {
		await this.page.goto('http://localhost:9000/#/users');
	}

	async clickNext(): Promise<void> {
		await this.nextButton.click();
	}

	async expectFirstUser(id: number): Promise<void> {
		await this.page.waitForFunction(() => !document.querySelector('.loading'));

		// const firstUserId = await this.firstUser.textContent({ timeout: 1000 });
		const firstUserId = await this.firstUser.textContent();

		await expect(firstUserId).toBe(`${id}`);
	}

	async isLoading(): Promise<boolean> {
		return await !!this.page.locator('.loading');
	}
}
