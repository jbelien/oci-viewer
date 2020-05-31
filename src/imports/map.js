"use strict";

import { defaults as ControlDefaults, Attribution, ScaleLine } from "ol/control";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import View from "ol/View";

import { onClick } from "./onClick";

export function createMap(target) {
  const controls = ControlDefaults({
    attribution: false,
  }).extend([
    new Attribution({
      collapsible: false,
    }),
    new ScaleLine(),
  ]);

  const map = new Map({
    controls,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    target,
    view: new View({
      center: [0, 0],
      zoom: 0,
    }),
  });

  map.on("click", (event) => onClick(map, event.pixel));

  return map;
}
