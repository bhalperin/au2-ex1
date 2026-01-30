import { inject } from 'aurelia';
import { GoogleMaps } from 'aurelia2-google-maps';
import { MapOptions } from '../util/maps';
import { Rest } from '../util/rest';
import { WEATHER_API_KEY, WeatherBit, WeatherResponse } from './weather.model';

@inject(Rest)
export class Weather {
	public heading = 'Weather in selected city';
	public city = '';
	public cityToWeather: string;
	public address: string;
	public currentWeather: WeatherBit;
	public error: string;
	public iconUrl: string;
	public gmap: GoogleMaps;
	public mapOptions: MapOptions = {
		address: 'new york, ny',
		zoom: 12,
		lat: 0,
		lon: 0,
	};
	public myClass: string = Math.random() > 0.5 ? 'benny' : '';

	constructor(private rest: Rest) {}

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

	public async submit() {
		await this.updateMap();
		this.currentWeather = null;
		this.getWeatherCurrentGeosearch();
		this.cityToWeather = this.city;

		return false;
	}

	public getWeatherCurrentGeosearch(): void {
		this.rest
			.getWeatherCurrentGeosearch(WEATHER_API_KEY, this.city)
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

	public async updateMap() {
		const geocoder = await this.gmap.getGeocoder();

		geocoder.geocode({ address: this.city }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK && results[0]) {
				const location = results[0].geometry.location;

				this.mapOptions.lat = location.lat();
				this.mapOptions.lon = location.lng();
				console.log('Geocode result:', results[0]);
			} else {
				console.error('Geocode was not successful for the following reason:', status);
			}
		});
	}
}
