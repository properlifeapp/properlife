import { error, redirect } from '@sveltejs/kit';
import { toastByUrl } from '$lib/utils/helpers';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';

// Name has a default value just to display something in the form.
const schema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load = async ({ locals }) => {
	// if (locals.pb.authStore.isValid) {
	// 	throw redirect(303, '/');
	// }

	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	login: async ({ request, locals }) => {
		// const body = Object.fromEntries(await request.formData());
		let form;
		let username = null;

		try {
			form = await superValidate(request, schema);
			console.log('POST', form);

			// Convenient validation check:
			if (!form.valid) {
				// Again, always return { form } and things will just work.
				return fail(400, { form });
			}

			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}

			username = locals.pb.authStore.model?.name;
		} catch (err) {
			// console.log('Error: ', err);
			console.log('Error response: ', err?.response);
			return setError(form, 'password', 'E-mail or Password is incorrect.');
		}

		let msg = 'Welcome back!';
		if (username) {
			msg = `'Welcome back, ${username}!'`;
		}

		throw redirect(303, `/user?${toastByUrl('success', msg)}`);
	},
	google: async ({ request, locals }) => {
		console.log('google');
		try {
			const authData = await locals.pb.collection('users').authWithOAuth2({ provider: 'google' });
			console.log({ authData });
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
			console.log(locals.pb.authStore.isValid);
			console.log(locals.pb.authStore.token);
			console.log(locals.pb.authStore.model.id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/');
	}
};
