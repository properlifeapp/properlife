import { redirect } from '@sveltejs/kit';
import { PUBLIC_DOMAIN_CLIENT } from '$env/static/public'

//basically if we don't have the userData from `+layout.server.js`
//we redirect the user to the signin page
export const load = async (event) => {
	const data = event.locals?.userData;
	if (!data) {
		throw redirect(303, `${PUBLIC_DOMAIN_CLIENT}/auth`);
	}
};