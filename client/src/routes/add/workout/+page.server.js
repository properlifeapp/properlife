import { error, redirect, fail } from '@sveltejs/kit';
import { toMachineFriendlyUsername, toastByUrl } from '$lib/utils/helpers';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

// Name has a default value just to display something in the form.
const schema = z.object({
	name: z.string().min(1),
	// workout_type: z.string().regex(/^(sequential|circuit)$/),
	workout_type: z
		.string()
		.regex(/^(sequential|circuit)$/)
		.default('sequential'),
	exercise_list: z
		.object({
			name: z.string().min(1),
			max_sets: z.number().min(0).nullable(),
			exercise_max_reps: z.number().min(0).nullable(),
			barbell: z.boolean(),
			set_config: z
				.object({
					weighted: z.boolean(),
					reps: z.number().min(0).nullable()
				})
				.array()
				.nonempty(),
			warmup_config: z
				.object({
					reps: z.number().min(1),
					percentage: z.number().min(1).max(100)
				})
				.array()
		})
		.array()
		.nonempty()
});

export const load = async ({ locals }) => {
	// if (locals.pb.authStore.isValid) {
	// 	throw redirect(303, '/');
	// }

	// Server API:
	const form = await superValidate(schema);

	const emptyExercise = {
		name: '',
		max_sets: null,
		exercise_max_reps: null,
		barbell: false,
		set_config: [{ weighted: true, reps: null }],
		warmup_config: []
		// warmup_config: [{ reps: null, percentage: null }]
	};

	const emptySet = { weighted: true, reps: null };
	const emptyWarmup = { reps: null, percentage: null };

	// Always return { form } in load and form actions.
	return { form, config: { emptyExercise, emptySet, emptyWarmup } };
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

		const exercises = formData.exercise_list.map((elem) => {
			return {
				name: elem.name,
				user_id: [locals.user.id],
				max_sets: elem.max_sets ? elem.max_sets : 0,
				barbell: elem.barbell,
				set_config: elem.set_config,
				warmup_config: elem.warmup_config.length ? elem.warmup_config : null
			};
		});

		try {
			const exerciseIds = [];
			for (let i = 0; i < exercises.length; ++i) {
				const record = await locals.pb.collection('exercise_config').create(exercises[i]);
				if (record?.code >= 400) {
					throw new Error(`Couldnt save exercise: ${exercises[i].name}`);
				}
				exerciseIds.push(record.id);
			}

			const workout_data = {
				name: formData.name,
				user_id: [locals.user.id],
				visibility: 'private',
				type: formData.workout_type,
				exercises: exerciseIds
			};
			const record = await locals.pb.collection('workout_config').create(workout_data);
			if (record?.code >= 400) {
				throw new Error(`Couldnt save exercise: ${exercises[i].name}`);
			}
		} catch (err) {
			console.log(err);
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data

		// Yep, return { form } here too
		return { form };

		// throw redirect(303, `/login?${toastByUrl('success', 'Account Created! Please login below.')}`);
	}
};
