import PocketBase from 'pocketbase';
import 'cross-fetch/polyfill';
import { serializeNonPOJOs } from '$lib/utils/helpers';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('https://properlife.app');
	// console.log('get headers', event.request.headers.get('cookie'))
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	// console.log({authStore: event.locals.pb.authStore.isValid})
	if (event.locals.pb.authStore.isValid) {

		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
