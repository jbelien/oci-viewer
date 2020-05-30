const fs = require("fs");

const contents = fs.readFileSync("node_modules/osm-community-index/package.json", "utf8");
const { version } = JSON.parse(contents);

fs.writeFileSync(
  "static/oci.json",
  JSON.stringify({
    version,
  }),
);

process.stdout.write(`✅ static/oci.json\n`);
