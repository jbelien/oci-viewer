<script context="module">
    import { stores } from "@sapper/app";

    import { extend } from "ol/extent";
    import GeoJSON from "ol/format/GeoJSON";
    import VectorLayer from "ol/layer/Vector";
    import VectorSource from "ol/source/Vector";
    // import { getArea } from "ol/sphere";

    import Map from "../../../components/Map.svelte";
    import FeatureLayer from "../../../components/FeatureLayer.svelte";

    export async function preload({ params }) {
        const group = params.group;
        const country = params.country;

        const res = await this.fetch(`features/${group}/${country}.json`);
        const data = await res.json();

        if (res.status === 200) {
            const features = data;

            features.forEach((feature) => {
                const layer = new VectorLayer({
                    source: new VectorSource({
                        features: new GeoJSON().readFeatures(feature, { featureProjection: "EPSG:3857" }),
                    }),
                });

                // const geometry = layer.getSource().getFeatures()[0].getGeometry();
                // const area = getArea(geometry);

                feature.layer = layer;
                feature.active = true;
                // feature.properties.area = Math.round(area / 1000000);
            });

            return { group, country: country.replace(/_/g, " "), features };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    const { page } = stores();

    export let country;
    export let features;
    export let group;
    export let iframe = typeof $page.query.iframe !== "undefined";

    $: activeFeatures = features.filter((feature) => feature.active);

    function renderComplete(map) {
        let extent = null;
        features.forEach((feature) => {
            if (extent === null) {
                extent = feature.layer.getSource().getExtent();
            } else {
                extend(extent, feature.layer.getSource().getExtent());
            }
        });

        map.getView().fit(extent, {
            maxZoom: 18,
            padding: [50, 50, 50, 50],
        });
    }

    function toggleFeature(feature) {
        feature.active = !feature.active;

        features = features; // required to force components to update
    }
</script>

<svelte:head>
    <title>{country.toUpperCase()} - {group.toUpperCase()}</title>
</svelte:head>

<style>
    div.row {
        height: var(--height-main);
    }

    #features-list {
        max-height: calc(var(--height-main) - 95px);
        overflow-y: auto;
    }
</style>

<div class="row no-gutters">
    <div class="col-lg-9">
        <Map callback={renderComplete}>
            {#each activeFeatures as feature (feature.id)}
                <FeatureLayer layer={feature.layer} />
            {/each}
        </Map>
    </div>
    <div class="col-lg-3 d-flex flex-column px-3">
        {#if !iframe}
        <h1 class="pt-3">{group.toUpperCase()}</h1>
        <h2>
            {country.toUpperCase()}
            <span class="badge badge-pill badge-info">{features.length}</span>
        </h2>
        {/if}
        <div id="features-list" class="flex-fill">
            <div class="list-group">
                {#each features as feature (feature.id)}
                <button type="button" class="list-group-item list-group-item-action" class:active={feature.active} on:click={() => toggleFeature(feature)}>
                    {feature.properties.name.toUpperCase()}
                </button>
                {/each}
            </div>
        </div>
    </div>
</div>