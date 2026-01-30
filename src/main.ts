import { RouterConfiguration } from '@aurelia/router';
import Aurelia from 'aurelia';
import { GoogleMapsConfiguration } from 'aurelia2-google-maps';
import { ConfigInterface } from 'aurelia2-google-maps/dist/types/configure';
import { App } from './app';
import { SharedElements } from './shared/elements';
import { Utils } from './util';

const mapsPluginOptions = {
	apiKey: 'AIzaSyBDpatbgT78e3gupI5NgbFsyoS7_P9fUcY',
	authReferrerPolicy: 'origin',
	libraries: ['geometry', 'places', 'marker'], // see https://developers.google.com/maps/documentation/javascript/libraries
	options: {
		zoom: 12,
	}, // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
} as ConfigInterface;
const basePath = process.env.ASSET_PATH ?? '';

Aurelia.register(
	RouterConfiguration.customize({
		basePath,
	}),
	SharedElements,
	Utils,
	GoogleMapsConfiguration.customize((config) => config.options(mapsPluginOptions)),
	// GoogleMapsConfiguration.configure(mapsPluginOptions),
)
	.app(App)
	.start();
