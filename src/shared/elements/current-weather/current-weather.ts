import { bindable } from 'aurelia';
import { WeatherBit } from '../../../geo/weather.model';

export class CurrentWeatherCustomElement {
	@bindable public currentWeather = null as WeatherBit | null;
	@bindable public iconUrl = '';

	constructor() {}

	get temperature() {
		let value = '';

		if (this.currentWeather?.temp) {
			value = `${Math.round(this.currentWeather.temp).toString()}`;
		}

		return value;
	}

	get weatherDescription() {
		let valueToDisplay = '';

		if (this.currentWeather) {
			valueToDisplay = `${this.currentWeather.weather.description}`;
		}

		return valueToDisplay;
	}
}
