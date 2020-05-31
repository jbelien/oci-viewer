<script context="module">
    import Map from "../components/Map.svelte";
    import CombinedLayer from "../components/CombinedLayer.svelte";
    import TypeFilter from "../components/TypeFilter.svelte";

    export async function preload({ params }) {
        const res = await this.fetch("oci.json");
        const { types } = await res.json();

        if (res.status === 200) {
            return { types };
        } else {
            this.error(res.status);
        }
    }
</script>

<script>
    export let types;

    let list;
    let type;
</script>

<svelte:head>
    <title>OpenStreetMap Community Index</title>
</svelte:head>

<style>
    div.row {
        height: var(--height-main);
    }

    #resources-list {
        max-height: calc(var(--height-main) - 95px);
        overflow-y: auto;
    }
</style>

<div class="row">
    <div class="col-9">
        <Map>
            <CombinedLayer {type} />
        </Map>
    </div>
    <div class="col d-flex flex-column">
        <TypeFilter bind:type={type} {types} {list} />
        <div id="resources-list" bind:this={list} class="flex-fill"></div>
    </div>
</div>