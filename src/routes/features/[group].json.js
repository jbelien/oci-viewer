import fs from "fs";
import path from "path";

function getCountries(group) {
  const countries = [];

  if (fs.existsSync(`data/features/${group}`) === true) {
    fs.readdirSync(`data/features/${group}`).forEach((filename) => {
      const content = fs.readFileSync(path.resolve(`data/features/${group}`, filename), "utf-8");
      const fname = path.basename(filename, path.extname(filename));
      const country = fname.replace(/_/g, " ").toUpperCase();

      countries.push({
        name: country,
        slug: fname.replace(/'/g, "%27"), // replace() is required to handle "cote_d'_ivoire" correctly in export
        count: JSON.parse(content).length,
      });
    });
  }

  return countries;
}

function getGlobalFeatures(group) {
  let features = [];

  if (fs.existsSync(`data/features/${group}.json`) === true) {
    const content = fs.readFileSync(`data/features/${group}.json`, "utf-8");

    features = JSON.parse(content);
  }

  return features;
}

export function get(req, res, next) {
  const { group } = req.params;

  const countries = getCountries(group);
  const features = getGlobalFeatures(group);

  if (countries.length > 0 || features.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({ countries, features }));
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
