<script context="module">
    import { stores } from "@sapper/app";

    import Resource from "../../../components/Resource.svelte";

    export async function preload({ params }) {
        const group = params.group;
        const country = params.country;

        const res = await this.fetch(`resources/${group}/${country}.json`);
        const data = await res.json();

        if (res.status === 200) {
            data.sort((a, b) => (b.order || 0) - (a.order || 0));

            return { group, country: country.replace(/_/g, " "), resources: data };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    const { page } = stores();

    export let country;
    export let group;
    export let iframe = typeof $page.query.iframe !== "undefined";
    export let resources;
</script>

<svelte:head>
    <title>{country.toUpperCase()} - {group.toUpperCase()}</title>
</svelte:head>

<div class="container">

    {#if !iframe}
    <h1 class="pt-3">{group.toUpperCase()}</h1>
    <h2>
        {country.toUpperCase()}
        <span class="badge badge-pill badge-info">{resources.length}</span>
    </h2>
    {/if}

    <ul class="list-group">
        {#each resources as resource}
        <Resource {resource}/>
        {/each}
    </ul>

</div>