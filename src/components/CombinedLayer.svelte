<script>
    import { onMount, afterUpdate, getContext } from "svelte";

    import { createLayer, updateLayer } from "../imports/layer";
    import { map as mapContextKey } from "../imports/context";

    export let type;

    const { getMap } = getContext(mapContextKey);
    const map = getMap();

    onMount(async () => {
        const res = await fetch("combined.min.geojson");

        if (res.status === 200) {
            const collection = await res.json();

            const layer = createLayer(collection);

            map.addLayer(layer);
        }
    });

    afterUpdate(() => {
        updateLayer(type);
    });
</script>