<script>
	import { superForm } from 'sveltekit-superforms/client';

	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';

	export let data;

	console.dir({ 'user workout svelte data': data }, { depth: null });

	const { form, errors, constraints, enhance } = superForm(data.form, {
		dataType: 'json'
	});

	const workout = data?.record;
	// $: user = data?.user;
	// $: exercises = data?.records;
	// $: exercise_weights = data?.initialWeights;
</script>

<div class="workout--wrapper">
	<h3>Workout</h3>
	<h1>{workout.name}</h1>
	{#if workout?.expand?.exercises.length}
		<div class="workout">
			{#each workout.expand.exercises as exercise, i}
				<div class="exercise">
					<div class="exercise--label">{exercise.name}</div>
					<div class="exercise--weight">
						<Textfield
							bind:value={workout.expand.exercises[i].weight}
							label="Exercise weight"
							type="number"
						/>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.workout--wrapper {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 2rem;
		h3 {
			font-size: 1.5rem;
			color: var(--grey-200);
		}
	}
</style>
