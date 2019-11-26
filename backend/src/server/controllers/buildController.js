const path = require("path");

const publicFolder = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "frontend",
  "build"
);
exports.publicFolder = publicFolder;

exports.getBuild = function(req, res) {
  res.sendFile(path.join(publicFolder, "index.html"));
};
