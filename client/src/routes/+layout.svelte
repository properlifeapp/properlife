<script>
	// Importing global styles for the app
	import '../app.scss';

	// Importing the toast functionality and its component from 'svelte-french-toast'
	import toast, { Toaster } from 'svelte-french-toast';

	// Exported variable 'data' which can be passed as a prop to this component
	// export const data;

	// Importing the 'page' store to access current page's properties
	import { page } from '$app/stores';

	// Variables to store the toast type and message extracted from the URL's query parameters
	let toast_type;
	let toast_message;

	// Object containing methods to display different types of toast notifications
	const toastObj = {
		success: (msg) => {
			toast.success(msg, {
				duration: 5000 // Toast duration is set to 5 seconds
			});
		},
		error: (msg) => {
			toast.error(msg, {
				duration: 5000 // Toast duration is set to 5 seconds
			});
		},
		info: (msg) => {
			toast(msg, {
				icon: 'ℹ️' // Displaying an info icon with the toast
			});
		}
	};

	// Reactive statement to check if the URL has 'toast_type' and 'toast_message' query parameters
	$: if ($page.url.searchParams.has('toast_type') && $page.url.searchParams.has('toast_message')) {
		// Extracting the values of 'toast_type' and 'toast_message' from the URL's query parameters
		toast_type = $page.url.searchParams.get('toast_type');
		toast_message = $page.url.searchParams.get('toast_message');

		// If the extracted 'toast_type' matches one of the methods in 'toastObj', display that type of toast
		if (toastObj.hasOwnProperty(toast_type)) {
			toastObj[toast_type](toast_message);
		}
		// If the 'toast_type' doesn't match any predefined types, display a generic toast with an info icon
		else {
			toast(toast_message, {
				icon: 'ℹ️'
			});
		}
	}

	// Logging the 'data' prop to the console
	// console.log(data);
</script>

<Toaster />
<slot />
