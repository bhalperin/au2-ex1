import { IContainer } from 'aurelia';
import { CurrentWeatherCustomElement } from './current-weather/current-weather';
import { GeoDataBoxCustomElement } from './geo-data-box/geo-data-box';

export const SharedElements = {
	register(container: IContainer) {
		container.register(GeoDataBoxCustomElement, CurrentWeatherCustomElement);
	},
};
