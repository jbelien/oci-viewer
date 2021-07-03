"use strict";

import { feature as getFeature, isIn, isInEuropeanUnion } from "@ideditor/country-coder";

import { levels } from "./levels";
import { renderResources } from "./render";

export function onClick(map, coordinate) {
  const pixel = map.getPixelFromCoordinate(coordinate);
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
      const { emojiFlag, groups, level, nameEn } = feature.getProperties();
      console.log(feature.getProperties());
      console.log(isIn(feature.getId(), '150'), isInEuropeanUnion(feature.getId()));

      console.log(groups);
      console.log(groups.map(g => getFeature(g)));
      console.log(groups.map(g => getFeature(g)));

      const region = groups.map(g => getFeature(g)).find(g => {
        console.log(g);
        return g.properties.level === 'region';
      });
      console.log(region);

      const title = level === 'country' ? `${emojiFlag} ${nameEn}` : nameEn;
      const resourcesList = renderResources([feature], title);

      if (typeof resourcesList !== "undefined") {
        document.getElementById("resources-list").append(resourcesList);
      }
    });
}
