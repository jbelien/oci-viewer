import colors from "colors/safe";
import fs from "fs";

const types = {
  discord: "Discord",
  discourse: "Discourse",
  facebook: "Facebook",
  forum: "Forum",
  github: "GitHub",
  gitlab: "GitLab",
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

export function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      version,
      types,
    }),
  );
}
