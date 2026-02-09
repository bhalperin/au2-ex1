import { bindable } from 'aurelia';

export class GeoDataBoxCustomElement {
	@bindable public cssClass = '';
	@bindable public iconClass = '';

	constructor() {}

	attached() {
		console.log('GeoDataBoxCustomElement attached', 'cssClass: [', this.cssClass, ']');
	}
}
