<script>
    import Nav from '../components/Nav.svelte';
    import Footer from '../components/Footer.svelte';

    export let segment;
    export let version = "0.0.0";
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