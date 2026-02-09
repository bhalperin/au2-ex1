import { WeatherResponse } from './weather.model';

export const mockWeatherResponse: WeatherResponse = {
	count: 1,
	data: [
		{
			lat: 41.14961,
			lon: -8.61099,
			temp: 14,
			weather: {
				description: 'Broken clouds',
				icon: 'c03d',
				code: 803,
			},
		},
	],
} as const;
