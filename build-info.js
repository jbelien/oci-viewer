const colors = require("colors/safe");
const fs = require("fs");

const types = {
  discord: "Discord",
  discourse: "Discourse",
  facebook: "Facebook",
  forum: "Forum",
  github: "GitHub",
  group: "Group",
  irc: "IRC",
  mailinglist: "Mailing-list",
  matrix: "Matrix",
  meetup: "Meetup",
  osm: "OpenStreetMap",
  "osm-lc": "OpenStreetMap Local Chapter",
  reddit: "Reddit",
  slack: "Slack",
  telegram: "Telegram",
  twitter: "Twitter",
  wiki: "Wiki",
  xmpp: "XMPP/Jabber",
  youthmappers: "Youth Mappers",
  youtube: "YouTube",
  aparat: "آپارات (Aparat)",
};

// Get OSM Community Index version
const contentsPackage = fs.readFileSync("node_modules/osm-community-index/package.json", "utf8");
const { version } = JSON.parse(contentsPackage);

// Get OSM Community Index types
const contentsSchemaResource = fs.readFileSync(
  "node_modules/osm-community-index/schema/resource.json",
  "utf8",
);
const schemaResource = JSON.parse(contentsSchemaResource);

schemaResource.properties.type.enum.forEach((type) => {
  if (Object.keys(types).indexOf(type) === -1) {
    types[type] = type.toUpperCase();

    console.warn(colors.yellow(`Missing type "${type}" name.\n`));
  }
});

// Write result
fs.writeFileSync(
  "static/oci.json",
  JSON.stringify({
    version,
    types,
  }),
);

process.stdout.write(`✅ static/oci.json\n`);
