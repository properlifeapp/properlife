// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';

import preprocess from 'svelte-preprocess';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({}),
	kit: {
		adapter: adapter(),
		files: {
			assets: 'static'
		},
		// paths: {
			// assets: 'http://localhost:5173',
			// assets: 'https://apps.mrc.org',
			// base: '/contentdashboard'
		// }
	}
};

export default config;
