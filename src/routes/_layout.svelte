<script context="module">
    import { stores } from '@sapper/app';

    import Nav from '../components/Nav.svelte';
    import Footer from '../components/Footer.svelte';

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
    export let iframe;
    export let segment;
    export let version;

    const { page } = stores();

    iframe = typeof $page.query.iframe !== "undefined";
</script>

<style>
    main {
        --height-main: calc(100vh - var(--height-nav) - var(--height-footer));

        min-height: var(--height-main);
    }
</style>

{#if !iframe}
<Nav {segment} />
{/if}

<main class="container">
    <slot {iframe}></slot>
</main>

<Footer {version} />