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
    import { fromLonLat, toLonLat } from 'ol/proj';
    import { onMount } from "svelte";

    export let types;

    let list;
    let type;
    let permalink;
    let zoom;
    let center;

    function renderPermalink(map, coordinate) {
        const mapZoom = map.getView().getZoom();
        const eventLngLat = toLonLat(coordinate);

        permalink = `#map=${Math.round(mapZoom)}/${Math.round(eventLngLat[1] * 1e6) / 1e6}/${Math.round(eventLngLat[0] * 1e6) / 1e6}`;
    }

    onMount(() => {
        if (window.location.hash !== '') {
            const hash = window.location.hash.replace('#map=', '');
            const parts = hash.split('/');

            if (parts.length === 3) {
                zoom = parseFloat(parts[0]);
                center = fromLonLat([parseFloat(parts[2]), parseFloat(parts[1])]);
            }
        }
    });
</script>

<svelte:head>
    <title>OpenStreetMap Community Index</title>
</svelte:head>

<style>
    div.row {
        height: var(--height-main);
    }

    div.col-lg-8 {
        min-height: 250px;
        max-height: 100%;
    }

    div.col-lg-4 {
        max-height: 100%;
    }

    #resources-list {
        max-height: calc(var(--height-main) - 95px);
        overflow-y: auto;
    }
</style>

<div class="row no-gutters">
    <div class="col-lg-8">
        <Map callbackClick={renderPermalink} {center} {zoom}>
            <CombinedLayer {type} />
        </Map>
    </div>
    <div class="col-lg-4 d-flex flex-column px-3">
        <TypeFilter bind:type={type} {types} {list} />
        <div id="resources-list" bind:this={list} class="flex-fill"></div>
        {#if permalink}
        <div>
            <hr>
            <a href="{permalink}">Permalink</a>
        </div>
        {/if}
    </div>
</div>