import fs from "fs";
import path from "path";

function getFeatures(group, country) {
  let features = [];

  if (fs.existsSync(`data/features/${group}/${country}.json`) === true) {
    const contents = fs.readFileSync(`data/features/${group}/${country}.json`, "utf-8");

    features = JSON.parse(contents).map((feature) => {
      const { id } = feature;

      feature.properties.name = path.basename(id, path.extname(id)).replace(/_/g, " ");

      return feature;
    });
  }

  return features;
}

export function get(req, res, next) {
  const { group, country } = req.params;

  const features = getFeatures(group, country);

  if (features.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(features));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      }),
    );
  }
}
