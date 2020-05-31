"use strict";

import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

const layer = new VectorLayer({
  source: new VectorSource({}),
});
let features = [];

export function createLayer(collection) {
  features = new GeoJSON().readFeatures(collection, { featureProjection: "EPSG:3857" });

  layer.getSource().addFeatures(features);

  return layer;
}

export function updateLayer(type) {
  layer.getSource().clear();

  if (type === "") {
    layer.getSource().addFeatures(features);
  } else {
    const filterFeatures = features
      .map((feature) => {
        const id = feature.getId();
        const geometry = feature.getGeometry();
        const properties = feature.getProperties();

        properties.resources = Object.values(properties.resources).filter(
          (resource) => resource.type === type,
        );

        const filterFeature = new Feature(properties);
        feature.setGeometry(geometry);
        feature.setId(id);

        return filterFeature;
      })
      .filter((feature) => {
        return feature.getProperties().resources.length > 0;
      });

    layer.getSource().addFeatures(filterFeatures);
  }

  return layer;
}
