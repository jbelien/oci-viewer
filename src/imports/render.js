"use strict";

export function renderResources(features, title) {
  if (features.length === 0) return;

  const div = document.createElement("div");

  const strong = document.createElement("strong");

  strong.innerHTML = title || "<em>Local</em>";

  div.append(strong);

  const ul = document.createElement("ul");

  ul.className = "list-unstyled";

  features.forEach((feature) => {
    const properties = feature.getProperties();
    const resources = Object.values(properties.resources).sort(
      (a, b) => (b.order || 0) - (a.order || 0),
    );

    resources.forEach((resource) => {
      const { name, url } = resource.resolved;

      const li = document.createElement("li");
      li.className = "d-flex";

      const img = document.createElement("img");
      img.className = "mr-2";
      img.src = `icons/${resource.type}.svg`;
      img.alt = resource.type;
      img.style.height = "1em";

      // li.append(img);

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.append(img, name);

      li.append(a);
      ul.append(li);
    });
  });

  div.append(ul);

  return div;
}
