<script>
    export let version;
</script>

<style>
    footer {
        height: var(--height-footer);
    }
</style>

<footer class="container d-flex align-items-center justify-content-between text-muted small">
    <div>
        Based on
        <a target="_blank" href="https://github.com/osmlab/osm-community-index">
            OpenStreetMap Community Index
        </a>
        <samp>{version}</samp>
    </div>
    <div>
        <a target="_blank" href="https://github.com/jbelien/oci-viewer/">
            GitHub repository
        </a>
        -
        <a target="_blank" href="https://github.com/jbelien/oci-viewer/issues">
            Report an issue
        </a>
    </div>
</footer>