import { redirect, json, fail } from '@sveltejs/kit';
import { toastByUrl } from '$lib/utils/helpers';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
export const load = async ({ locals, url, params }) => {
	try {
		const workoutId = params.workout_id || null;
		console.log({ workoutId });
		// const workoutId = url.searchParams.get('id') || null;
		if (!workoutId) {
			throw redirect(
				303,
				`/user/workouts?${toastByUrl('error', `There was an error selecting that workout`)}`
			);
		}

		const record = await locals.pb.collection('workout_config').getOne(workoutId, {
			expand: 'exercises'
		});

		// if (record?.expand?.exercises.length) {
		// 	record.expand.exercises = record.expand.exercises.map((elem) => {
		// 		return {
		// 			...elem,
		// 			weight: 0
		// 		};
		// 	});
		// }

		locals.record = record;

		const schema = z.object({
			exercises: z
				.object({
					sets: z
						.object({
							weight: z.number().min(0),
							max: z.number().min(0),
							reps: z.number().min(0)
						})
						.array()
						.nonempty()
				})
				.array()
				.nonempty()
		});

		const form = await superValidate(schema);

		return { form, record };
	} catch (err) {
		console.log(err);
		return {};
	}
};

export const actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);
		console.log(locals.user);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const formData = form.data;
		console.dir(formData, { depth: null });

		// try {
		// 	const exerciseIds = [];
		// 	for (let i = 0; i < exercises.length; ++i) {
		// 		const record = await locals.pb.collection('exercise_config').create(exercises[i]);
		// 		if (record?.code >= 400) {
		// 			throw new Error(`Couldnt save exercise: ${exercises[i].name}`);
		// 		}
		// 		exerciseIds.push(record.id);
		// 	}

		// 	const workout_data = {
		// 		name: formData.name,
		// 		user_id: [locals.user.id],
		// 		visibility: 'private',
		// 		type: formData.workout_type,
		// 		exercises: exerciseIds
		// 	};
		// 	const record = await locals.pb.collection('workout_config').create(workout_data);
		// 	if (record?.code >= 400) {
		// 		throw new Error(`Couldnt save exercise: ${exercises[i].name}`);
		// 	}
		// } catch (err) {
		// 	console.log(err);
		// 	return fail(400, { form });
		// }

		// TODO: Do something with the validated form.data

		// Yep, return { form } here too
		return { form };

		// throw redirect(303, `/login?${toastByUrl('success', 'Account Created! Please login below.')}`);
	}
};
