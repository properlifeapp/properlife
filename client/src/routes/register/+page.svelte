<script>
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;

	// Client API:
	const { form, errors, constraints } = superForm(data.form);
	$: console.log({ errors });
</script>

<div class="register--wrapper">
	<h1>Register</h1>
	<!-- <SuperDebug data={$form} /> -->

	<div class="register">
		<form action="?/register" method="POST">
			<div class="name--register form--group">
				<Textfield
					type="text"
					input$name="name"
					bind:value={$form.name}
					label="Name"
					required
					{...$constraints.name}
				>
					<Icon class="material-icons" slot="leadingIcon">person</Icon>
				</Textfield>
				{#if $errors.name}<small class="invalid">{$errors.name}</small>{/if}
			</div>
			<div class="email--register form--group">
				<Textfield
					type="email"
					input$name="email"
					bind:value={$form.email}
					label="Email"
					required
					{...$constraints.email}
				>
					<Icon class="material-icons" slot="leadingIcon">email</Icon>
				</Textfield>
				{#if $errors.email}<small class="invalid">{$errors.email}</small>{/if}
			</div>
			<div class="password--register form--group">
				<Textfield
					type="password"
					input$name="password"
					bind:value={$form.password}
					label="Password"
					required
					{...$constraints.password}
				>
					<Icon class="material-icons" slot="leadingIcon">key</Icon>
				</Textfield>
				{#if $errors.password}<small class="invalid">{$errors.password}</small>{/if}
			</div>
			<div class="passwordConfirm--register form--group">
				<Textfield
					type="password"
					input$name="passwordConfirm"
					bind:value={$form.passwordConfirm}
					label="Confirm Password"
					required
					{...$constraints.passwordConfirm}
				>
					<Icon class="material-icons" slot="leadingIcon">key</Icon>
				</Textfield>
				{#if $errors.passwordConfirm}
					{#each $errors.passwordConfirm as error}
						<small class="invalid">{error}</small>
					{/each}
				{/if}
			</div>
			<div>
				<button type="submit"><span>Register</span></button>
			</div>
		</form>
		<div class="login">
			<a href="/login">I already have an account</a>
		</div>
	</div>
</div>

<style lang="scss">
	.register--wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
		align-items: center;
		padding: 2rem;
		h1 {
			font-size: 1.5rem;
			color: var(--grey-200);
		}
		.register {
			padding: 2rem;
			background: white;
			border: 1px solid var(--grey-100);
			border-radius: 0.25rem;
			display: flex;
			flex-direction: column;
			row-gap: 2rem;

			form {
				display: flex;
				row-gap: 2rem;
				align-items: center;
				flex-direction: column;

				.form--group {
					display: grid;
					.invalid {
						color: var(--red-600);
					}
				}

				button {
					background: var(--btn-primary-gradient);
					display: flex;
					justify-content: center;
					align-items: center;
					width: 8rem;
					height: 2.5rem;
					border-radius: 0.25rem;
					border: none;
					outline: none;
					cursor: pointer;
					// transition: background 300ms ease-in-out;
					// &:hover{
					// 	background: var(--btn-primary-gradient-reverse);

					// }
					span {
						font-size: 0.875rem;
						font-weight: 700;
						color: white;
					}
				}
			}
			.login {
				display: flex;
				justify-content: center;
				a {
					color: var(--green-800);
					font-size: 0.875rem;
					font-style: normal;
					font-weight: 400;
					text-decoration: none;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
	:global(.form--group input) {
		max-width: 100%;
		width: 20rem;
	}
</style>
