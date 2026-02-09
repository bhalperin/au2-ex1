export interface WeatherBit {
	lat: number;
	lon: number;
	country_code?: string;
	temp?: number;
	weather: {
		description: string;
		code: number;
		icon: string;
	}
}

export interface WeatherResponse {
	count: number;
	data: WeatherBit[];
}

export const WEATHER_API_KEY = '37cb5829e9494a46ae209ab5417df674';  // API key from https://www.weatherbit.io
