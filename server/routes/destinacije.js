const router = require("express").Router();
const DC = require("../controllers/DestinacijaController");

router.get("/:destinacije/:destinacija", DC.getDestinacija);
router.get("/:destinacije", DC.getDestinacije);

module.exports = router;
