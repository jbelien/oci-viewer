<script>
    import { onMount, setContext } from "svelte";

    import { map as mapContextKey } from "../imports/context";

    let container;
    let map;

    setContext(mapContextKey, {
        getMap: () => map
    });

    onMount(async () => {
        const { createMap } = await import("../imports/map");

        map = createMap(container);
    });
</script>

<div bind:this="{container}" class="h-100">
    {#if map}
    <slot></slot>
    {/if}
</div>