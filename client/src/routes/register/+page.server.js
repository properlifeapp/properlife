import { error, redirect, fail } from '@sveltejs/kit';
import { toMachineFriendlyUsername, toastByUrl } from '$lib/utils/helpers';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

// Name has a default value just to display something in the form.
const schema = z
	.object({
		name: z.string().min(1),
		email: z.string().email(),
		password: z.string().min(8, { message: 'Password must contain at least 8 character(s)' }),
		passwordConfirm: z.string().min(8, { message: 'Password must contain at least 8 character(s)' })
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm'] // path of error
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
	register: async ({ locals, request }) => {
		let form;
		
		try {
			form = await superValidate(request, schema);
			console.log('POST', form);

			// Convenient validation check:
			if (!form.valid) {
				// Again, always return { form } and things will just work.
				return fail(400, { form });
			}
			
			console.log('success');
			console.log(form.data);
			let username = toMachineFriendlyUsername(form.data.name);
			
			// example create data
			const data = {
				username,
				email: form.data.email,
				emailVisibility: true,
				password: form.data.password,
				passwordConfirm: form.data.passwordConfirm,
				name: form.data.name
			};

			const record = await locals.pb.collection('users').create(data);
			await locals.pb.collection('users').requestVerification(form.data.email);

			// console.log({ record });
		} catch (err) {
			console.log('Error: ', err);
			// console.log('Error response: ', err?.response);
			if(err?.response?.data?.email?.code === "validation_invalid_email"){
				throw redirect(303, `/login?duplicate=true&${toastByUrl('info', `The email ${form.data.email} is already in use.\n\nPlease login below, click 'Forgot my password', or create a new account.` || err?.response?.data?.email?.message)}`);

			}

			return { form };
		}

		throw redirect(303, `/login?${toastByUrl('success', 'Account Created! Please login below.')}`);
	}
};
