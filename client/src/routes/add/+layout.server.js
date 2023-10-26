import { redirect } from '@sveltejs/kit';


export const load = async ({ locals }) => {
	// console.log(locals.pb.authStore.isValid)
	if (!locals.pb.authStore?.isValid) {
		throw redirect(303, '/');
	}
};
