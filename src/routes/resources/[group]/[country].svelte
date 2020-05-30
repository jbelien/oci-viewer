<script context="module">
    import Resource from '../../../components/Resource.svelte';

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
    export let group;
    export let country;
    export let resources;
</script>

<svelte:head>
    <title>{country.toUpperCase()} - {group.toUpperCase()}</title>
</svelte:head>

<h1 class="pt-3">{group.toUpperCase()}</h1>
<h2>
    {country.toUpperCase()}
    <span class="badge badge-pill badge-info">{resources.length}</span>
</h2>

<ul class="list-group">
    {#each resources as resource}
    <Resource {resource}/>
    {/each}
</ul>