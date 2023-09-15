import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	console.log('hey')
	const { cookie } = await request.json();
	console.log({cookie})
	const response = new Response();
	console.log({response})
	const redirecter = redirect(303, "http://localhost:5173/")
	console.log({redirecter})


	// response.headers.set('set-cookie', cookie)

	// return response.redirect(303, "http://localhost:5173/")
	return redirect(303, "/");
	// return json(null);
};
