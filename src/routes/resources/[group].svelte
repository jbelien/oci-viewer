<script context="module">
    import Resource from '../../components/Resource.svelte';

    export async function preload({ params }) {
        const group = params.group;

        const res = await this.fetch(`resources/${group}.json`);
        const data = await res.json();

        if (res.status === 200) {
            data.resources.sort((a, b) => (b.order || 0) - (a.order || 0));

            return { group, data };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    export let group;
    export let data;
</script>

<svelte:head>
    <title>{group.toUpperCase()}</title>
</svelte:head>

<div class="container">

    <h1 class="pt-3">{group.toUpperCase()}</h1>

    {#if data.countries.length > 0}
    <h2>Countries</h2>
    <ul>
        {#each data.countries as country}
        <li>
            <a rel="prefetch" href="resources/{group}/{country.slug}">{country.name}</a>
            <span class="badge badge-pill badge-info">{country.count}</span>
        </li>
        {/each}
    </ul>
    {/if}

    {#if data.resources.length > 0}
    <h2>Resources</h2>
    <ul class="list-group">
        {#each data.resources as resource}
        <Resource {resource}/>
        {/each}
    </ul>
    {/if}

</div>