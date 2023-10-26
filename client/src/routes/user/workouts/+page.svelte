<script>
	export let data;

	console.log({ 'user workout svelte data': data });
	// $: user = data?.user;
	$: workouts = data?.records;
	import List, { Item, Separator, Text } from '@smui/list';
</script>

<div class="workout--wrapper">
	<h1>Workouts</h1>

	<List class="demo-list">
		{#each workouts as workout}
			<!-- <a href={`/workout?id=${workout.id}`}><span>{workout.name}<span></span></a> -->
			<a href={`/workout/${workout.id}`}><Item><Text>{workout.name}</Text></Item></a>
			<Separator />
		{/each}
	</List>

	<!-- <div class="workout--grid">
	</div> -->
</div>

<style lang="scss">
	.workout--wrapper {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 2rem;
		h1 {
			font-size: 1.5rem;
			color: var(--grey-200);
		}
		.demo-list {
			a {
				color: var(--grey-900);
				text-decoration: none;
			}
		}
		.workout--grid {
			width: 100%;
			border: 2px solid var(--grey-100);
			border-radius: 0.25rem;
			a {
				display: block;
				text-decoration: none;
				font-size: 1rem;
				background: white;
				padding: 1.5rem;
				// text-align: center;
				// height: 2rem;
				border-bottom: 2px solid var(--grey-100);
				display: flex;
				align-items: center;
				justify-content: center;
				color: var(--grey-700);
				&:last-child {
					border-bottom: none;
				}
				&:nth-child(even) {
					background: var(--grey-050);
				}
			}
		}
		&* :global(.demo-list) {
			width: 20rem;
			max-width: 100%;

			// text-align: center;
		}
	}
</style>
