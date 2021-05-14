<script>
    export let resource;
</script>

<li class="list-group-item" data-order="{resource.order}">
    <div class="media">
        <img src="icons/{resource.type}.svg" class="mr-3" alt="{resource.type}" style="width: 48px;">
        <div class="media-body">
            <div class="d-flex justify-content-between">
                <h3 class="h5 mt-0">
                    <a target="_blank" href="{resource.resolved.url}">
                        {resource.resolved.name}
                    </a>
                </h3>
                {#if resource.languageCodes}
                <div>
                    {#each resource.languageCodes as lang}
                    <span class="badge badge-secondary ml-1" title={lang.name} style="cursor: help;">{lang.code}</span>
                    {/each}
                </div>
                {/if}
            </div>
            <p class="mb-0">{resource.resolved.description.replace(/\{(.+?)\}/, function (match, p1) { return resource[p1]; })}</p>
            {#if resource.resolved.extendedDescription}
            <p class="mb-0 small">{resource.resolved.extendedDescription.replace(/\{(.+?)\}/, function (match, p1) { return resource[p1]; })}</p>
            {/if}
        </div>
    </div>
</li>