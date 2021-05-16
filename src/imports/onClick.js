"use strict";

import { levels } from "./levels";
import { renderResources } from "./render";

export function onClick(map, pixel) {
  const features = map.getFeaturesAtPixel(pixel);

  document.getElementById("resources-list").innerHTML = "";

  const localResourcesList = renderResources(
    features.filter((feature) => typeof feature.getProperties().level === "undefined"),
  );
  if (typeof localResourcesList !== "undefined") {
    document.getElementById("resources-list").append(localResourcesList);
  }

  features
    .filter((feature) => typeof feature.getProperties().level !== "undefined")
    .sort((a, b) => {
      const aProperties = a.getProperties();
      const bProperties = b.getProperties();

      if (aProperties.level === bProperties.level) {
        const aName = aProperties.nameEn.toLowerCase();
        const bName = bProperties.nameEn.toLowerCase();

        return aName < bName ? -1 : aName > bName ? 1 : 0;
      }

      return levels.indexOf(bProperties.level) - levels.indexOf(aProperties.level);
    })
    .forEach((feature) => {
      const name = feature.getProperties().nameEn;

      const resourcesList = renderResources([feature], name);

      if (typeof resourcesList !== "undefined") {
        document.getElementById("resources-list").append(resourcesList);
      }
    });
}
