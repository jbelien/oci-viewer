"use strict";

import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";

const layer = new VectorLayer({
  source: new VectorSource({}),
  style: (feature, resolution) => {
    const { level, resources } = feature.getProperties();

    const orders = Object.values(resources).map(resource => resource.order || 0);
    const order = Math.max(...orders);

    let zIndex = 2000;
    switch(level) {
      case 'world': zIndex = 100 + order; break;
      case 'unitedNations': zIndex = 200 + order; break;
      case 'union': zIndex = 300 + order; break;
      case 'subunion': zIndex = 400 + order; break;
      case 'region': zIndex = 500 + order; break;
      case 'subregion': zIndex = 600 + order; break;
      case 'intermediateRegion': zIndex = 700 + order; break;
      case 'sharedLandform': zIndex = 800 + order; break;
      case 'country': zIndex = 900 + order; break;
      case 'subcountryGroup': zIndex = 1000 + order; break;
      case 'territory': zIndex = 1100 + order; break;
      case 'subterritory': zIndex = 1200 + order; break;
      default: zIndex = 2000 + order; break;
    }

    const fill = new Fill({
      color: "rgba(255,255,255,0.4)",
    });
    const stroke = new Stroke({
      color: "#3399CC",
      width: 1.25,
    });

    return new Style({ fill, stroke, zIndex });
  },
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
