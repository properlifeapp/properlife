<script>
	import SegmentedButton, { Segment } from '@smui/segmented-button';
	// import { flip } from 'svelte/animate';
	// import { quintOut } from 'svelte/easing';

	import { fade } from 'svelte/transition';

	import Textfield from '@smui/textfield';

	import HelperText from '@smui/textfield/helper-text';
	import { Label } from '@smui/common';
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';
	// import Icon from '@smui/textfield/icon';
	import { superForm } from 'sveltekit-superforms/client';
	import Checkbox from '@smui/checkbox';
	import Button, { Icon } from '@smui/button';
	import Card, { Content, Actions } from '@smui/card';

	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;

	console.log({ 'user workout svelte data': data });

	const { form, errors, constraints, enhance } = superForm(data.form, {
		dataType: 'json'
	});

	const { emptyExercise, emptySet, emptyWarmup } = data.config;

	//set up for workout-config radio buttons
	let choices = ['sequential', 'circuit'];
	let selected = 'sequential';

	//set up for barbell-config radio buttons
	let barbell_choices = [
		{
			value: true,
			label: 'Barbell'
		},
		{
			value: false,
			label: 'Dumbell / Weight Stack / Body Weight'
		}
	];
	//set up for set-config radio buttons
	let set_choices = [
		{
			value: true,
			label: 'Weighted'
		},
		{
			value: false,
			label: 'Bodyweight'
		}
	];

	//push first empty exercise
	$form.exercise_list = [emptyExercise, ...$form.exercise_list];

	const capitalizeFirstChar = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;
	const stringToColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = '#';
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		return `${color}0d`;
	};
	const removeAtIndex = (arr, index) => [...arr.slice(0, index), ...arr.slice(index + 1)];

	const disabledRepsMap = {};

	const matchSestAndRepsWithSetValue = (list) => {
		for (let i = 0; i < $form.exercise_list.length; ++i) {
			if ($form.exercise_list[i].max_sets) {
				if ($form.exercise_list[i].max_sets < $form.exercise_list[i].set_config.length) {
					$form.exercise_list[i].set_config = [
						...$form.exercise_list[i].set_config.slice(0, $form.exercise_list[i].max_sets)
					];
				}
				while ($form.exercise_list[i].max_sets > $form.exercise_list[i].set_config.length) {
					$form.exercise_list[i].set_config = [...$form.exercise_list[i].set_config, emptySet];
				}
			}

			const reps = $form.exercise_list[i].exercise_max_reps;

			disabledRepsMap[i] = !!reps;
			if (reps) {
				for (let j = 0; j < $form.exercise_list[i].set_config.length; ++j) {
					$form.exercise_list[i].set_config[j].reps = reps;
				}
			}
		}
	};
	$: matchSestAndRepsWithSetValue($form.exercise_list);
</script>

<div class="create-workout--wrapper">
	<h1>Create Workout</h1>

	<div class="create-workout">
		<form method="POST" use:enhance>
			<div class="workout-config">
				<Textfield bind:value={$form.name} label="Workout Label" required>
					<!-- <HelperText slot="helper">Helper Text</HelperText> -->
				</Textfield>
				<div class="workout-type">
					<!-- <p>Choose the workout structure:</p> -->
					<ul>
						<li>
							<p>
								<strong>Sequential:</strong> Complete all sets of the current exercise before moving
								on to the next.
							</p>
						</li>
						<li>
							<p>
								<strong>Circuit:</strong> Perform one set of each exercise in sequence, then repeat.
							</p>
						</li>
					</ul>
					<div class="radios">
						{#each choices as option}
							<FormField>
								<Radio
									class="my-colored-radio"
									bind:group={$form.workout_type}
									value={option}
									touch
								/>
								<span slot="label">{capitalizeFirstChar(option)}</span>
							</FormField>
						{/each}
					</div>
				</div>
			</div>
			<div class="exercise-list">
				{#each $form.exercise_list as _, index}
					<!-- {console.log($form.exercise_list[i])} -->
					<!-- <div class="exercise" style={$form.exercise_list[i].name.length ? `background: ${stringToColor($form.exercise_list[i].name)}` : ''}> -->
					<div class="exercise">
						<Textfield
							bind:value={$form.exercise_list[index].name}
							label="Exercise Label"
							required
						/>
						<div>
							<div class="barbell">
								{#each barbell_choices as barbell_option}
									<FormField>
										<Radio
											class="my-colored-radio"
											bind:group={$form.exercise_list[index].barbell}
											value={barbell_option.value}
											on:check
											touch
										/>
										<span slot="label">{barbell_option.label}</span>
									</FormField>
								{/each}
							</div>

							<!-- <div class="barbell">
								<FormField>
									<Checkbox bind:checked={$form.exercise_list[i].barbell} touch />
									<span slot="label">Barbell Exercise</span>
								</FormField>
							</div> -->
						</div>
						<div>
							<Textfield
								bind:value={$form.exercise_list[index].max_sets}
								label="Sets"
								type="number"
							>
								<HelperText slot="helper"
									>Sets for this exercise. 0 or blank for unlimited.
								</HelperText>
							</Textfield>
							{#if $errors.exercise_list?.[index]?.max_sets}
								<small class="invalid">{$errors.exercise_list?.[index]?.max_sets}</small>
							{/if}
						</div>
						<div>
							<Textfield
								bind:value={$form.exercise_list[index].exercise_max_reps}
								label="Reps"
								type="number"
							>
								<HelperText slot="helper"
									>Max reps per set. 0 or blank for unlimited or per-rep setting.
								</HelperText>
							</Textfield>
							{#if $errors.exercise_list?.[index]?.exercise_max_reps}
								<small class="invalid">{$errors.exercise_list?.[index]?.exercise_max_reps}</small>
							{/if}
						</div>

						<div class="set-config">
							<div class="form--label">Heavy Sets</div>
							<div class="set-config--grid">
								{#each $form.exercise_list[index].set_config as _, set_index (set_index)}
									<div class="card-container set" transition:fade>
										<Card>
											<Content>
												<div class="set--label">Set {$form.exercise_list[index].set_config.length > 1 ? set_index + 1 : 'configuration'}</div>
												<div class="set--inputs">
													<div class="weighted">
														{#each set_choices as set_option}
															<FormField>
																<Radio
																	class="my-colored-radio"
																	bind:group={$form.exercise_list[index].set_config[set_index]
																		.weighted}
																	value={set_option.value}
																	on:check
																	touch
																/>
																<span slot="label">{set_option.label}</span>
															</FormField>
														{/each}
													</div>
													<div class="set-reps">
														<Textfield
															bind:value={$form.exercise_list[index].set_config[set_index].reps}
															label="Reps"
															type="number"
															disabled={disabledRepsMap[index] || false}
														>
															<HelperText slot="helper"
																>Max reps per set. 0 or blank for unlimited.
															</HelperText>
														</Textfield>
														{#if $errors.exercise_list?.[index]?.set_config[set_index]?.reps}
															<small class="invalid"
																>{$errors.exercise_list?.[index]?.set_config[set_index].reps}</small
															>
														{/if}
													</div>
												</div>
											</Content>
											{#if $form?.exercise_list[index]?.set_config?.length > 1}
												<Actions fullBleed>
													<Button
														on:click={(e) => {
															e.preventDefault();
															$form.exercise_list[index].set_config = removeAtIndex(
																$form.exercise_list[index].set_config,
																set_index
															);
														}}
													>
														<Label>Remove</Label>
														<i class="material-icons" aria-hidden="true">delete</i>
													</Button>
												</Actions>
											{/if}
										</Card>
									</div>
								{/each}
							</div>
							<Button
								on:click={(e) => {
									e.preventDefault();
									$form.exercise_list[index].set_config = [
										...$form.exercise_list[index].set_config,
										emptySet
									];
								}}
								touch
								variant="outlined"
							>
								<i class="material-icons" aria-hidden="true">add</i>
								<Label>Add Set</Label>
							</Button>
						</div>

						<div class="set-config warmupsets">
							<div class="form--label">Warm Up Sets</div>
							<small class="form--label">Leave blank for no warmup sets</small>
							{#if $form?.exercise_list[index]?.warmup_config.length > 0}
								<div class="set-config--grid">
									{#each $form.exercise_list[index].warmup_config as _, warmup_set_index (warmup_set_index)}
										<div class="card-container set warmup" transition:fade>
											<Card>
												<Content>
													<div class="set--label">Set {warmup_set_index + 1}</div>
													<div class="set--inputs">
														<div class="set-reps">
															<Textfield
																bind:value={$form.exercise_list[index].warmup_config[
																	warmup_set_index
																].reps}
																label="Reps"
																type="number"
															>
																<HelperText slot="helper"
																	>Max reps per set. 0 or blank for unlimited.
																</HelperText>
															</Textfield>
															{#if $errors.exercise_list?.[index]?.warmup_config[warmup_set_index]?.reps}
																<small class="invalid"
																	>{$errors.exercise_list?.[index]?.warmup_config[warmup_set_index]
																		.reps}</small
																>
															{/if}
														</div>
														<div class="set-percent">
															<Textfield
																bind:value={$form.exercise_list[index].warmup_config[
																	warmup_set_index
																].percentage}
																label="Percent (%)"
																type="number"
															>
																<HelperText slot="helper"
																	>Percentage of your heavy lift weight for this warm-up set.</HelperText
																>
															</Textfield>
															{#if $errors.exercise_list?.[index]?.warmup_config[warmup_set_index]?.percentage}
																<small class="invalid"
																	>{$errors.exercise_list?.[index]?.warmup_config[warmup_set_index]
																		.percentage}</small
																>
															{/if}
														</div>
													</div>
												</Content>
												{#if $form?.exercise_list[index]?.warmup_config?.length > 1}
													<Actions fullBleed>
														<Button
															on:click={(e) => {
																e.preventDefault();
																$form.exercise_list[index].warmup_config = removeAtIndex(
																	$form.exercise_list[index].warmup_config,
																	warmup_set_index
																);
															}}
														>
															<Label>Remove</Label>
															<i class="material-icons" aria-hidden="true">delete</i>
														</Button>
													</Actions>
												{/if}
											</Card>
										</div>
									{/each}
								</div>
							{/if}

							<Button
								on:click={(e) => {
									e.preventDefault();
									$form.exercise_list[index].warmup_config = [
										...$form.exercise_list[index].warmup_config,
										emptyWarmup
									];
								}}
								touch
								variant="outlined"
							>
								<i class="material-icons" aria-hidden="true">add</i>
								<Label>Add Warmup Set</Label>
							</Button>
						</div>
					</div>
				{/each}
			</div>
			<Button
				on:click={(e) => {
					e.preventDefault();
					$form.exercise_list = [...$form.exercise_list, emptyExercise];
				}}
				touch
				variant="outlined"
			>
				<i class="material-icons" aria-hidden="true">add</i>
				<Label>Add Exercise</Label>
			</Button>
			<input type="submit" class="submit" />
		</form>
	</div>
</div>

<style lang="scss">
	.create-workout--wrapper {
		--grid-padding: clamp(1rem, -1.462rem + 12.308vw, 2rem);
		// --grid-padding: 2rem;
		--form-grey: #000000de;
		padding: var(--grid-padding);
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 2rem;
		h1 {
			font-size: 1.5rem;
			color: var(--grey-200);
		}
		.create-workout {
			background-color: white;
			padding: var(--grid-padding);
			width: 100%;
			form {
				display: grid;
				row-gap: 2rem;
				.invalid {
					color: var(--red-600);
				}
				.form--label {
					color: var(--smui-form-grey);
					// font-weight: bold;
				}
				.workout-config {
					display: grid;
					row-gap: 2rem;
					.workout-type {
						display: grid;
						row-gap: 0.5rem;
						ul {
							list-style: none;
							display: grid;
							row-gap: 0.5rem;
						}
						p {
							font-size: 0.875rem;
							color: var(--grey-500);
						}
						.radios {
							margin-left: -13px;
						}
					}
				}
				.exercise-list {
					display: grid;
					row-gap: 2rem;
					.exercise {
						transition: background 300ms ease-in-out;
						background-color: var(--grey-050);
						padding: var(--grid-padding);
						// padding-top: .5rem;
						width: 100%;
						display: grid;
						row-gap: 1rem;
						.barbell {
							margin-left: -14px;
						}
					}
					.set-config {
						--mdc-theme-surface: white;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						row-gap: 0.75rem;
						&.warmupsets{
							margin-top: 1rem;
						}
						&--grid {
							display: grid;
							row-gap: var(--grid-padding);
							.set {
								--mdc-theme-primary: var(--red-600);
								--mdc-theme-surface: white;
								&--label {
									font-weight: bold;
									color: var(--grey-200);
								}
								&--inputs {
									display: flex;
									column-gap: 3rem;
									// row-gap: 1rem;
									// row-gap: var(--grid-padding);
									flex-wrap: wrap;
									align-items: center;
									.weighted {
										margin-left: -13px;
										display: grid;
									}
								}
							}
						}
						&* :global(.smui-card__content) {
							padding: var(--grid-padding);
							padding-bottom: 1rem;
						}
					}
				}
			}
		}
	}

	// :global(
	// 		.set .mdc-card__action .mdc-button__label,
	// 		.set .mdc-card__action .material-icons,
	// 		.set .mdc-card__action .mdc-button__ripple::after,
	// 		.set .mdc-card__action .mdc-button__ripple::before
	// 	) {
	// 	color: var(--red-600);
	// }
</style>
