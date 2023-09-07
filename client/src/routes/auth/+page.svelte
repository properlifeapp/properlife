<script>
	import Google from "$lib/components/svgs/Google.svelte";

    import { PUBLIC_DOMAIN_CLIENT } from '$env/static/public'

</script>

<div class="login--wrapper">
    <div class="login">
        <h1>Login</h1>
        <p>MRC Content Dashboard</p>
        <a href={`${PUBLIC_DOMAIN_CLIENT}/auth/google`}><Google /><span>Sign In with Google</span></a>
    </div>
</div>

<style lang="scss">
    .login--wrapper{
        min-width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--blue-grey-050);

        .login{
            h1{
                color: var(--blue-grey-900);
                font-size: 2.25rem;
                margin-bottom: .25rem;
            }
            p{
                
                color: var(--blue-grey-400);
                margin-bottom: 1.5rem;
            }
            a{
                display: flex;
                background: white;
                padding: 1rem;
                align-items: center;
                column-gap: .5rem;
                color: var(--blue-grey-050);
                background-color: var(--magenta-500);
                border-radius: .5rem;
                text-decoration: none;
            }
        }
    }
</style>
