import "ol/ol.css";

import "../sass/style.scss";

import svgAparat from "../../data/osm-community-index-master/dist/img/aparat.svg";
import svgDiscord from "../../data/osm-community-index-master/dist/img/discord.svg";
import svgDiscourse from "../../data/osm-community-index-master/dist/img/discourse.svg";
import svgFacebook from "../../data/osm-community-index-master/dist/img/facebook.svg";
import svgForum from "../../data/osm-community-index-master/dist/img/forum.svg";
import svgGitHub from "../../data/osm-community-index-master/dist/img/github.svg";
import svgGroup from "../../data/osm-community-index-master/dist/img/group.svg";
import svgIRC from "../../data/osm-community-index-master/dist/img/irc.svg";
import svgMailingList from "../../data/osm-community-index-master/dist/img/mailinglist.svg";
import svgMatrix from "../../data/osm-community-index-master/dist/img/matrix.svg";
import svgMeetup from "../../data/osm-community-index-master/dist/img/meetup.svg";
import svgOSM from "../../data/osm-community-index-master/dist/img/osm.svg";
import svgReddit from "../../data/osm-community-index-master/dist/img/reddit.svg";
import svgSlack from "../../data/osm-community-index-master/dist/img/slack.svg";
import svgTelegram from "../../data/osm-community-index-master/dist/img/telegram.svg";
import svgTwitter from "../../data/osm-community-index-master/dist/img/twitter.svg";
import svgWiki from "../../data/osm-community-index-master/dist/img/wiki.svg";
import svgXMPP from "../../data/osm-community-index-master/dist/img/xmpp.svg";
import svgYouthMappers from "../../data/osm-community-index-master/dist/img/youthmappers.svg";
import svgYouTube from "../../data/osm-community-index-master/dist/img/youtube.svg";

import { Map, View, MapBrowserEvent } from "ol";
import Feature from "ol/Feature";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";

// var geojson: FeatureCollection;

(function () {
  const map = new Map({
    controls: defaultControls().extend([new ScaleLine()]),
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 0
    })
  });

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: (new GeoJSON({ featureProjection: map.getView().getProjection() })).readFeatures(geojson)
    })
  });

  map.addLayer(vectorLayer);

  map.on("click", (event: MapBrowserEvent) => {
    const features = map.getFeaturesAtPixel(event.pixel);

    document.getElementById("overlay-list").innerHTML = "";

    if (features.length > 0) {
      document.getElementById("overlay-info").setAttribute("hidden", "");

      features.forEach((feature: Feature) => {
        const id = feature.getId();
        const { resources } = feature.getProperties();

        Object.values(resources).forEach((resource: Object) => {
          if (typeof resource.name !== "undefined") {
            const li = document.createElement("li");

            let icon: SVGElement = null;

            switch (resource.type) {
              case "aparat": icon = svgAparat; break;
              case "discord": icon = svgDiscord; break;
              case "discourse": icon = svgDiscourse; break;
              case "facebook": icon = svgFacebook; break;
              case "forum": icon = svgForum; break;
              case "github": icon = svgGitHub; break;
              case "group": icon = svgGroup; break;
              case "irc": icon = svgIRC; break;
              case "mailinglist": icon = svgMailingList; break;
              case "matrix": icon = svgMatrix; break;
              case "meetup": icon = svgMeetup; break;
              case "osm": icon = svgOSM; break;
              case "reddit": icon = svgReddit; break;
              case "slack": icon = svgSlack; break;
              case "telegram": icon = svgTelegram; break;
              case "twitter": icon = svgTwitter; break;
              case "wiki": icon = svgWiki; break;
              case "xmpp": icon = svgXMPP; break;
              case "youthmappers": icon = svgYouthMappers; break;
              case "youtube": icon = svgYouTube; break;
            }

            if (icon !== null) {
              li.innerHTML += `<img src="${icon}" alt="${resource.type}" style="height: 1em;"> `;
            }
            li.innerHTML += `<a href="${resource.url}" target="_blank">${resource.name}</a>`;

            document.getElementById("overlay-list").append(li);
          }
        });
      });
    } else {
      document.getElementById("overlay-info").removeAttribute("hidden");
    }
  })

  document.getElementById("map-filter-type").addEventListener("change", (event: Event) => {
    const element = event.target as HTMLSelectElement;
    const type = element.value;

    vectorLayer.getSource().clear();

    if (type.length > 0) {
      const collection: GeoJSON.FeatureCollection = {
        "type": "FeatureCollection",
        "features": []
      };
      const features: GeoJSON.Feature[] = JSON.parse(JSON.stringify(geojson.features)); // Is it really the best way to copy without reference ?

      features.forEach((feature: GeoJSON.Feature) => {
        let properties: Object = {
          area: feature.properties.area,
          resources: {}
        };
        let key: string;

        for (key in feature.properties.resources) {
          if (feature.properties.resources.hasOwnProperty(key) && feature.properties.resources[key].type === type) {
            properties.resources[key] = feature.properties.resources[key];
          }
        }

        if (Object.values(properties.resources).length > 0) {
          feature.properties.resources = properties.resources;

          collection.features.push(Object.assign({}, feature));
        }
      });

      vectorLayer.getSource().addFeatures((new GeoJSON({ featureProjection: map.getView().getProjection() })).readFeatures(collection));
    } else {
      vectorLayer.getSource().addFeatures((new GeoJSON({ featureProjection: map.getView().getProjection() })).readFeatures(geojson));
    }
  });
})();
