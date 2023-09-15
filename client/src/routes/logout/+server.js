import { redirect } from '@sveltejs/kit';
import { toastByUrl } from '$lib/utils/helpers';

export const POST = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;

	throw redirect(303, `/login?${toastByUrl('success', 'Goodbye, Have a lovely day!')}`);
};
