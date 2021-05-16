<script>
    import { onMount, setContext } from "svelte";

    import { map as mapContextKey } from "../imports/context";

    export let callbackRender;
    export let callbackClick;
    export let zoom;
    export let center;

    let container;
    let map;

    setContext(mapContextKey, {
        getMap: () => map
    });

    onMount(async () => {
        const { createMap } = await import("../imports/map");
        const { onClick } = await import("../imports/onClick");

        map = createMap(container, {
            center: center || [0, 0],
            zoom: zoom || 0
        });

        map.on("rendercomplete", () => {
            if (typeof zoom !== 'undefined' && typeof center !== 'undefined') {
                onClick(map, center);

                if (typeof callbackClick !== "undefined") {
                    callbackClick(map, center);
                }
            }

            if (typeof callbackRender !== "undefined") {
                callbackRender(map);
            }
        })

        map.on("singleclick", (event) => {
            onClick(event.map, event.coordinate);

            if (typeof callbackClick !== "undefined") {
                callbackClick(event.map, event.coordinate);
            }
        });
    });
</script>

<div bind:this="{container}" class="h-100">
    {#if map}
    <slot></slot>
    {/if}
</div>