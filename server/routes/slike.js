const router = require("express").Router();
const SC = require("../controllers/SlikaController");

router.get("/:slika", SC.getSlika);

module.exports = router;
