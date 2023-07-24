import { RouterConfiguration } from '@aurelia/router';
import Aurelia from 'aurelia';
import { GoogleMapsConfiguration } from 'aurelia2-google-maps';
import { App } from './app';
import { SharedElements } from './shared/elements';
import { Utils } from './util';

const mapsPluginOptions = {
	apiKey: 'AIzaSyBDpatbgT78e3gupI5NgbFsyoS7_P9fUcY',
	apiLibraries: 'geometry', // see https://developers.google.com/maps/documentation/javascript/libraries
	options: {
		panControl: true,
		panControlOptions: {
			position: 9
		},
		zoom: 12
	} // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
};
// const basePath = process.env.ASSET_PATH ? `${process.env.ASSET_PATH}/` : '';
const basePath = process.env.ASSET_PATH ? 'ASSET_PATH' : '';

Aurelia
	.register(
		RouterConfiguration.customize({
			basePath
		}),
		SharedElements,
		Utils
	)
	.register(
		GoogleMapsConfiguration.configure(mapsPluginOptions)
	)
	.app(App)
	.start();
