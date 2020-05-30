import fs from "fs";

function getResources(group, country) {
  let resources = [];

  if (fs.existsSync(`data/resources/${group}/${country}.json`) === true) {
    const content = fs.readFileSync(`data/resources/${group}/${country}.json`, "utf-8");

    resources = JSON.parse(content);
  }

  return resources;
}

export function get(req, res, next) {
  const { group, country } = req.params;

  const resources = getResources(group, country);

  if (resources.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(resources));
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
