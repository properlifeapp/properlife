<script>
	// import toast from 'svelte-french-toast';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;

	// Client API:
	const { form, errors, constraints } = superForm(data.form);
	$: console.log({ errors });
</script>

<div class="login--wrapper">
	<h1>Login</h1>
	<!-- <SuperDebug data={$form} /> -->

	<div class="login">
		<form method="POST" action="?/login">
			<div class="email--login form--group">
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
				{#if $errors.email}
					{#each $errors.email as error}
						<small class="invalid">{error}</small>
					{/each}
				{/if}
			</div>
			<div class="password--login form--group">
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
				{#if $errors.password}
					{#each $errors.password as error}
						<small class="invalid">{error}</small>
					{/each}
				{/if}
			</div>
			<!-- <div>
				<label for="email">
					<span>Email</span>
				</label>
				<input type="email" name="email" />
			</div> -->
			<div>
				<button><span>Login</span></button>
			</div>
		</form>
		<div class="register">
			<a href="/register">Create an account</a>
		</div>
		<!-- <Button href="/register">
			<Label>Create an account</Label>
		</Button> -->
	</div>
</div>

<style lang="scss">
	.login--wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
		align-items: center;
		padding: 2rem;
		h1 {
			font-size: 1.5rem;
			color: var(--grey-200);
		}
		.login {
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
			.register {
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
					// text-align: center;
				}
			}
		}
		// justify-content: center;
	}

	:global(.form--group input) {
		max-width: 100%;
		width: 20rem;
	}
</style>
