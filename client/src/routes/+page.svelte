<!-- This shit is here for the root page. In the end you shouldn't 
    see this unless you're trying to break the app -->
    <script>
        export let data

        console.log({'page svelte data': data})
        $: user = data?.user
    </script>
    
<h1>Herro</h1>
<p>{`You should see this >:)`}</p>

{#if user}
<p>Hello {user.name}</p>
<form action="/logout" method="post">
<button>logout</button>
</form>
<a href="/anotherPage">anotherPage</a>
{:else}
<a href="/login">Login</a>
<a href="/register">Register</a>
<a href="/anotherPage">anotherPage</a>
{/if}

<style lang="scss">
    h1{
        color: rebeccapurple;
    }
</style>