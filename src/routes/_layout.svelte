<script context="module">
    import Map from "../components/Map.svelte";

    export async function preload({ params }) {
        const res = await this.fetch("oci.json");
        const { version } = await res.json();

        if (res.status === 200) {
            return { version };
        } else {
            this.error(res.status);
        }
    }
</script>

<script>
    import Nav from '../components/Nav.svelte';
    import Footer from '../components/Footer.svelte';

    export let segment;
    export let version;
</script>

<style>
    main {
        --height-main: calc(100vh - var(--height-nav) - var(--height-footer));

        min-height: var(--height-main);
    }
</style>

<Nav {segment} />

<main class="container">
    <slot></slot>
</main>

<Footer {version} />