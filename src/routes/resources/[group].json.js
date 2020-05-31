import fs from "fs";
import path from "path";

function getCountries(group) {
  const countries = [];

  if (fs.existsSync(`data/resources/${group}`) === true) {
    fs.readdirSync(`data/resources/${group}`).forEach((filename) => {
      const content = fs.readFileSync(path.resolve(`data/resources/${group}`, filename), "utf-8");
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

function getGlobalResources(group) {
  let resources = [];

  if (fs.existsSync(`data/resources/${group}.json`) === true) {
    const content = fs.readFileSync(`data/resources/${group}.json`, "utf-8");

    resources = JSON.parse(content);
  }

  return resources;
}

export function get(req, res, next) {
  const { group } = req.params;

  const countries = getCountries(group);
  const resources = getGlobalResources(group);

  if (countries.length > 0 || resources.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({ countries, resources }));
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
