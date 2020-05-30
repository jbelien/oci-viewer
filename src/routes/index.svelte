<script context="module">
    import Map from "../components/Map.svelte";

    export async function preload({ params }) {

        const res = await this.fetch("combined.min.geojson");
        const data = await res.json();

        if (res.status === 200) {
            return { data };
        } else {
            this.error(res.status);
        }
    }
</script>

<script>
    export let data;
    export let list;
    export let type;
    export let collection = JSON.parse(JSON.stringify(data));

    function applyFilter(event) {
        list.innerHTML = "";

        collection = JSON.parse(JSON.stringify(data));

        if (type !== "") {
            collection.features.map((feature) => {
                feature.properties.resources = Object.values(feature.properties.resources).filter((resource) => resource.type === type);

                return feature;
            });
            collection.features = collection.features.filter((feature) => feature.properties.resources.length > 0);
        }
    }
</script>

<svelte:head>
    <title>OpenStreetMap Community Index</title>
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css" type="text/css">
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
        <Map {collection} />
    </div>
    <div class="col d-flex flex-column">
        <div class="form-group mt-3">
            <label for="filter-type" class="mr-2">
                Filter:
            </label>
            <select id="filter-type" class="form-control form-control-sm" bind:value={type} on:change={applyFilter}>
                <option value="">Show all</option>
                <option value="aparat">آپارات (Aparat)</option>
                <option value="discord">Discord</option>
                <option value="discourse">Discourse</option>
                <option value="facebook">Facebook</option>
                <option value="forum">Forum</option>
                <option value="github">GitHub</option>
                <option value="group">Group</option>
                <option value="irc">IRC</option>
                <option value="mailinglist">Mailing-list</option>
                <option value="matrix">Matrix</option>
                <option value="meetup">Meetup</option>
                <option value="osm">OpenStreetMap</option>
                <option value="osm-lc">OpenStreetMap Local Chapter</option>
                <option value="reddit">Reddit</option>
                <option value="slack">Slack</option>
                <option value="telegram">Telegram</option>
                <option value="twitter">Twitter</option>
                <option value="wiki">Wiki</option>
                <option value="xmpp">XMPP</option>
                <option value="youthmappers">Youth Mappers</option>
                <option value="youtube">YouTube</option>
            </select>
        </div>
        <div id="resources-list" bind:this={list} class="flex-fill"></div>
    </div>
</div>