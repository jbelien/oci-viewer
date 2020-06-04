<script>
    import { onMount, onDestroy, getContext } from "svelte";

    import { map as mapContextKey } from "../imports/context";

    export let layer;

    const { getMap } = getContext(mapContextKey);
    const map = getMap();

    onMount(() => {
        map.addLayer(layer);
    });

    onDestroy(() => {
        map.removeLayer(layer);
    });
</script>