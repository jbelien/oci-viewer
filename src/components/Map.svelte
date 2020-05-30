<script>
    import { onMount, afterUpdate } from 'svelte';

    export let collection;
    export let container;
    export let layer;
    export let map;

    onMount(async () => {
        const { createMap } = await import('../imports/map');
        const { createLayer } = await import('../imports/layer');

        map = createMap(container);
        layer = createLayer(collection);

        map.addLayer(layer);
    });

    afterUpdate(async () => {
        const { updateLayer } = await import('../imports/layer');

        if (typeof layer !== "undefined") {
            updateLayer(layer, collection);
        }
    })
</script>

<div bind:this="{container}" class="h-100"></div>