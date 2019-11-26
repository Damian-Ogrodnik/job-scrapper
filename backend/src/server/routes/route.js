const express = require("express");
const path = require("path");
const router = express.Router();

const offersController = require("../controllers/offersController");

const publicFolder = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "frontend",
  "build"
);
router.use(express.static(publicFolder));

router.get("/jobs-search", offersController.checkOffers);

router.get("*", (req, res) => {
  res.sendFile(path.join(publicFolder, "index.html"));
});

module.exports = router;
