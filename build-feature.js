const fs = require("fs");
const glob = require("glob");
const path = require("path");

glob
  .sync("node_modules/osm-community-index/features/**/*", {})
  .filter((path) => fs.lstatSync(path).isDirectory())
  .forEach((directory) => {
    let country = path.basename(directory);
    let group = path.basename(path.dirname(directory));

    if (group === "features") {
      group = country;
      country = null;
    }

    fs.mkdirSync(`data/features/${group}`, { recursive: true });

    const array = [];
    glob.sync(`${directory}/*.geojson`).forEach((file) => {
      const contents = fs.readFileSync(file, "utf8");

      array.push(JSON.parse(contents));
    });

    if (array.length > 0) {
      if (country === null) {
        fs.writeFileSync(`data/features/${group}.json`, JSON.stringify(array));
      } else {
        fs.writeFileSync(`data/features/${group}/${country}.json`, JSON.stringify(array));
      }
    }

    process.stdout.write(`✅ ${directory}\n`);
  });
