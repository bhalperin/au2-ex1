import { bindable } from 'aurelia';
import { WeatherBit } from '../../weather/weather.model';

export class CurrentWeatherCustomElement {
	@bindable public city = '';
	@bindable public currentWeather = null as WeatherBit;
	@bindable public iconUrl = '';

	constructor() { }

	get temperature(): string {
		let value = "";

		if (this.currentWeather) {
			value = `${Math.round(this.currentWeather.temp).toString()}`;
		}

		return value;
	}

	get weatherDescription(): string {
		let valueToDisplay = "";

		if (this.currentWeather) {
			valueToDisplay = `${this.currentWeather.weather.description}`;
		}

		return valueToDisplay;
	}
}
