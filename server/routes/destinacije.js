const router = require("express").Router();
const DC = require("../controllers/DestinacijaController");

router.get("/:tip", DC.getDestinacije);
router.get("/:tip/:destinacija", DC.getDestinacija);

module.exports = router;
