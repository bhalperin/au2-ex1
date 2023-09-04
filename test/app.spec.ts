import { render } from './helper';
import { App } from '../src/app';

describe('my-app', () => {
	it('should render message', async () => {
		const node = (await render('<app></app>', App)).querySelector('nav');
		const navLinks = node.children;

		expect(navLinks.length).toBe(3);
		expect(navLinks[0].textContent.toLowerCase()).toBe('about');
	});
});
