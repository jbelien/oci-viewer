<script>
    import { onMount, setContext } from "svelte";

    import { map as mapContextKey } from "../imports/context";

    export let callback;

    let container;
    let map;

    setContext(mapContextKey, {
        getMap: () => map
    });

    onMount(async () => {
        const { createMap } = await import("../imports/map");

        map = createMap(container);

        map.on("rendercomplete", () => {
            if (typeof callback !== "undefined") {
                callback(map);
            }
        })
    });
</script>

<div bind:this="{container}" class="h-100">
    {#if map}
    <slot></slot>
    {/if}
</div>