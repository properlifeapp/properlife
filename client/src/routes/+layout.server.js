import { serializeNonPOJOs } from '$lib/utils/helpers';

export const load = ({ locals }) => {
	if (locals.user && locals.user.profile) {
		return {
			profile: serializeNonPOJOs(locals.user.profile)
		};
	}
};
