import fs from "fs";
import path from "path";

function getFeatures(group, country) {
  let features = [];

  const file = `data/features/` + (country === group ? `${group}.json` : `${group}/${country}.json`);

  if (fs.existsSync(file) === true) {
    const contents = fs.readFileSync(file, "utf-8");

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
