"use strict";

import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export function createLayer(collection) {
  const features = new GeoJSON().readFeatures(collection, { featureProjection: "EPSG:3857" });

  const layer = new VectorLayer({
    source: new VectorSource({
      features,
    }),
  });

  return layer;
}

export function updateLayer(layer, collection) {
  const features = new GeoJSON().readFeatures(collection, { featureProjection: "EPSG:3857" });

  layer.getSource().clear();
  layer.getSource().addFeatures(features);

  return layer;
}
