import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		try {
			console.log();
			const { token, user } = await locals.pb
				.collection('users')
				.authWithOAuth2({ provider: 'google' });

			console.log({ token, user });
		} catch (err) {
			console.log('Error:', err);
			return {
				error: true
			};
		}
		throw redirect(303, '/');
	}
};
