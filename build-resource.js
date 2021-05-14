const cldr = require("cldr");
const fs = require("fs");
const glob = require("glob");
const resolveStrings = require("osm-community-index/lib/resolve_strings");
const path = require("path");

const defaultsContent = fs.readFileSync("node_modules/osm-community-index/defaults.json", "utf8");
const defaults = JSON.parse(defaultsContent);

glob
  .sync("node_modules/osm-community-index/resources/**/*", {})
  .filter((path) => fs.lstatSync(path).isDirectory())
  .forEach((directory) => {
    let country = path.basename(directory);
    let group = path.basename(path.dirname(directory));

    if (group === "resources") {
      group = country;
      country = null;
    }

    fs.mkdirSync(`data/resources/${group}`, { recursive: true });

    const array = [];
    glob.sync(`${directory}/*.json`).forEach((file) => {
      const contents = fs.readFileSync(file, "utf8");

      array.push(JSON.parse(contents));
    });

    array
      .sort((a, b) => (b.order || -Infinity) - (a.order || -Infinity))
      .forEach((resource) => {
        if (typeof resource.languageCodes !== "undefined") {
          resource.languageCodes = resource.languageCodes.map((code) => {
            return { code, name: cldr.extractLanguageDisplayNames("en")[code] };
          });
        }

        const resolvedStrings = resolveStrings(resource, defaults.defaults);
        if (!resolvedStrings.name)         { throw new Error('Cannot resolve a value for name'); }
        if (!resolvedStrings.description)  { throw new Error('Cannot resolve a value for description'); }
        if (!resolvedStrings.url)          { throw new Error('Cannot resolve a value for url'); }

        resource.resolved = resolvedStrings;
      });

    if (array.length > 0) {
      if (country === null) {
        fs.writeFileSync(`data/resources/${group}.json`, JSON.stringify(array));
      } else {
        fs.writeFileSync(`data/resources/${group}/${country}.json`, JSON.stringify(array));
      }
    }

    process.stdout.write(`✅ ${directory}\n`);
  });
