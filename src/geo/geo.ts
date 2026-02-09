import { inject } from 'aurelia';
import { GoogleMaps } from 'aurelia2-google-maps';
import { MapOptions } from '../util/maps';
import { Rest } from '../util/rest';
import { WEATHER_API_KEY, WeatherBit, WeatherResponse } from './weather.model';

@inject(Rest)
export class Geo {
	public heading = 'Geographic Data';
	public locationName = '';
	public locationToWeather: string;
	public address: string;
	public currentWeather: WeatherBit;
	public weatherError: string;
	public iconUrl: string;
	public gmap: GoogleMaps;
	public mapOptions: MapOptions = {
		address: 'new york, ny',
		zoom: 12,
		lat: 0,
		lon: 0,
	};
	public mapError = '';
	public myClass = Math.random() > 0.5 ? 'benny' : '';

	constructor(private rest: Rest) {}

	public created() {
		this.locationToWeather = this.locationName;
	}

	public attached() {
		// this.getWeatherCurrentGeosearch();
	}

	get selectedCity() {
		return this.locationName;
	}

	// @computedFrom("selectedCity")
	get weather() {
		let valueToDisplay = 'City not found';

		if (this.currentWeather) {
			valueToDisplay = `${Math.round(this.currentWeather.temp).toString()} degrees. ${this.currentWeather.weather.description}`;
		}

		return valueToDisplay;
	}

	public async submit() {
		await this.updateMap();
		this.currentWeather = null;
		await this.getWeatherCurrentGeosearch();
		this.locationToWeather = this.locationName;

		return false;
	}

	public async getWeatherCurrentGeosearch() {
		this.weatherError = '';
		await this.rest
			.getWeatherCurrentGeosearch(WEATHER_API_KEY, this.locationName)
			/* .getWeatherMock() */
			.then((response: WeatherResponse) => {
				if (!response) {
					throw new Error('No response');
				}

				this.currentWeather = response.data[0];
				if (!this.currentWeather.temp) {
					throw `${this.locationName} not found`;
				}
				this.iconUrl = this.rest.getWeatherIconUrl(WEATHER_API_KEY, this.currentWeather.weather.icon);

				console.log('parent / currentWeather:', this.currentWeather);
				console.log('parent / iconUrl:', this.iconUrl);
			})
			.catch((error) => {
				this.weatherError = error;
			});
	}

	public async updateMap() {
		const geocoder = await this.gmap.getGeocoder();

		this.mapError = '';
		geocoder.geocode({ address: this.locationName }, (results, status) => {
			console.log('Geocode status:', status);
			switch (status) {
				case google.maps.GeocoderStatus.OK:
					if (results?.length) {
						const location = results[0].geometry.location;

						this.mapOptions.lat = location.lat();
						this.mapOptions.lon = location.lng();
						console.log('Geocode result:', results[0]);
					} else {
						this.mapError = `Map location ${this.locationName} is ok but no results found`;
					}
					break;
				case google.maps.GeocoderStatus.ZERO_RESULTS:
					this.mapError = `Map location ${this.locationName} not found`;
					break;
				default:
					this.mapError = `Geocode error: ${status}`;
			}
		});
	}
}
