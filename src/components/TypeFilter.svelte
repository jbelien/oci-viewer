<script>
    export let list;
    export let types;
    export let type;

    function applyFilter() {
        list.innerHTML = "";
    }
</script>

<form class="form-group mt-3" autocomplete="off">
    <label for="filter-type" class="mr-2">
        Filter:
    </label>
    <select id="filter-type" class="form-control form-control-sm" bind:value={type} on:change={applyFilter}>
        <option value="">Show all</option>
        {#if types}
        {#each Object.keys(types) as type}
        <option value="{type}">{types[type]}</option>
        {/each}
        {/if}
    </select>
</form>