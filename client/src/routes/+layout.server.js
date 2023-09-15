export const load = ({ locals }) => {
	// console.log('load locals', locals)
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: undefined
	};
};

// import { serializeNonPOJOs } from '$lib/utils/helpers';

// export const load = ({ locals }) => {
// 	if (locals.user && locals.user.profile) {
// 		return {
// 			profile: serializeNonPOJOs(locals.user.profile)
// 		};
// 	}
// };
