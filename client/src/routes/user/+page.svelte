<script>
	import Button, { Label } from '@smui/button';

	export let data;

	console.log({ 'user svelte data': data });
	$: user = data?.user;
</script>

<div class="user--wrapper">
		<Button href="/user/workouts" variant="raised">
			<Label>Start Workout</Label>
		</Button>
		<Button href="/add/workout" variant="outlined">
			<Label>Add Workout</Label>
		</Button>

</div>

<style lang="scss">
	.user--wrapper {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 1rem;
		// .start{
		// 	--mdc-theme-primary: var(--btn-primary-gradient)
		// }
		// .startWorkout {
		// 	background: var(--btn-primary-gradient);
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// 	// width: 12rem;
		// 	padding-inline: 2.5rem;
		// 	height: 2.5rem;
		// 	border-radius: 0.25rem;
		// 	border: none;
		// 	outline: none;
		// 	cursor: pointer;
		// 	text-decoration: none;
		// 	// transition: background 300ms ease-in-out;
		// 	// &:hover{
		// 	// 	background: var(--btn-primary-gradient-reverse);

		// 	// }
		// 	span {
		// 		font-size: 0.875rem;
		// 		font-weight: 700;
		// 		color: white;
		// 	}

		// 	&.secondary {
		// 		background: none;
		// 		border: 1px solid #168d20;
		// 		// border: 1px solid var(--green-800);
		// 		span {
		// 			// color: #168D20;
		// 			color: var(--green-800);
		// 		}
		// 	}
		// }
	}
</style>
