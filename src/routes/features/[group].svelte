<script context="module">
    export async function preload({ params }) {
        const group = params.group;

        const res = await this.fetch(`features/${group}.json`);
        const data = await res.json();

        if (res.status === 200) {
            data.features.sort((a, b) => (b.order || 0) - (a.order || 0));

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

    {@debug data}

    {#if data.features.length > 0}
    <ul>
        <li>
            <a rel="prefetch" href="features/{group}/{group}">{group.toUpperCase()}</a>
            <span class="badge badge-pill badge-info">{data.features.length}</span>
        </li>
    </ul>
    {/if}

    {#if data.countries.length > 0}
    <h2>Countries</h2>
    <ul>
        {#each data.countries as country}
        <li>
            <a rel="prefetch" href="features/{group}/{country.slug}">{country.name}</a>
            <span class="badge badge-pill badge-info">{country.count}</span>
        </li>
        {/each}
    </ul>
    {/if}

</div>