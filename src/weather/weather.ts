import { inject } from 'aurelia';
import { MapOptions } from '../util/maps';
import { Rest } from '../util/rest';
import { WEATHER_API_KEY, WeatherBit, WeatherResponse } from './weather.model';

@inject(Rest)
export class Weather {
	public heading = 'Weather in selected city';
	public city = 'New York';
	public cityToWeather: string;
	public address: string;
	public currentWeather: WeatherBit;
	public error: string;
	public iconUrl: string;
	public gmap;
	public mapOptions: MapOptions = {
		address: '',
		zoom: 12,
		lat: 40.71427,
		lon: -74.00597
	};
	public myClass: string = Math.random() > 0.5 ? 'benny' : '';

	constructor(private rest: Rest) {
		// this.map = new GoogleMaps();
	}

	public created() {
		this.cityToWeather = this.city;
	}

	public attached(): void {
		// this.getWeatherCurrentGeosearch();
	}

	get selectedCity(): string {
		return this.city;
	}

	// @computedFrom("selectedCity")
	get weather(): string {
		let valueToDisplay = 'City not found';

		if (this.currentWeather) {
			valueToDisplay = `${Math.round(this.currentWeather.temp).toString()} degrees. ${this.currentWeather.weather.description}`;
		}

		return valueToDisplay;
	}

	public submit() {
		this.currentWeather = null;
		this.getWeatherCurrentGeosearch();
		this.cityToWeather = this.city;

		return false;
	}

	public getWeatherCurrentGeosearch(): void {
		this.rest.getWeatherCurrentGeosearch(WEATHER_API_KEY, this.city)
			.then((response: WeatherResponse) => {
				if (!response) {
					throw new Error('No response');
				}
				setTimeout(() => {
					this.currentWeather = response.data[0];
					if (!this.currentWeather.temp) {
						throw `${this.city} not found`;
					}
					this.iconUrl = this.rest.getWeatherIconUrl(WEATHER_API_KEY, this.currentWeather.weather.icon);
					console.log('parent / currentWeather:', this.currentWeather);
					console.log('parent / iconUrl:', this.iconUrl);
				}, 5000);
			})
			.catch((error: Error) => {
				this.error = error.message;
			});
	}
}
