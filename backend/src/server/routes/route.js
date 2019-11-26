const express = require("express");
const router = express.Router();

const offersController = require("../controllers/offersController");
const buildController = require("../controllers/buildController");

router.use(express.static(buildController.publicFolder));
router.get("/jobs-search", offersController.checkOffers);
router.get("*", buildController.getBuild);

module.exports = router;
