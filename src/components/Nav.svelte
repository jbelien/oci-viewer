<script>
    export let segment;
</script>

<style>
    nav.navbar {
        height: var(--height-nav);
    }
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#home">💬 OSM Community Index</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" class:active={ segment===undefined }>
                    <a class="nav-link" href="#map">Map <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown" class:active={ segment==="resources" }>
                    <a class="nav-link dropdown-toggle" href="#resources" id="navbar-resources" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Resources
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbar-resources">
                        <h6 class="dropdown-header">Community resources</h6>
                        <a class="dropdown-item" href="resources/africa">Africa</a>
                        <a class="dropdown-item" href="resources/asia">Asia</a>
                        <a class="dropdown-item" href="resources/europe">Europe</a>
                        <a class="dropdown-item" href="resources/middle-east">Middle East</a>
                        <a class="dropdown-item" href="resources/north-america">North America</a>
                        <a class="dropdown-item" href="resources/oceania">Oceania</a>
                        <a class="dropdown-item" href="resources/south-america">South America</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="resources/world">Global (World)</a>
                    </div>
                </li>
                <li class="nav-item dropdown" class:active={ segment==="features" }>
                    <a class="nav-link dropdown-toggle" href="#features" id="navbar-features" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Features
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbar-features">
                        <h6 class="dropdown-header">Areas where the communities are active</h6>
                        <a class="dropdown-item disabled" href="features/africa">Africa</a>
                        <a class="dropdown-item disabled" href="features/asia">Asia</a>
                        <a class="dropdown-item disabled" href="features/europe">Europe</a>
                        <!-- <a class="dropdown-item" href="features/middle-east">Middle East</a> -->
                        <a class="dropdown-item disabled" href="features/north-america">North America</a>
                        <a class="dropdown-item disabled" href="features/oceania">Oceania</a>
                        <a class="dropdown-item disabled" href="features/south-america">South America</a>
                    </div>
                </li>
            </ul>
            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
    </div>
</nav>