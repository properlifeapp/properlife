import { redirect, json } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// you can also fetch all records at once via getFullList
	const records = await locals.pb.collection('workout_config').getFullList();
	// const records = await locals.pb.collection('workout_config').getFullList({
    //     filter: `id = "${locals.user.id}" || visibility = "global"`
	// });

    console.log({records})

    return {records}
    // return json(records)

};
