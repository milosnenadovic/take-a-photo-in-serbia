const router = require("express").Router();
const DC = require("../controllers/DestinacijaController");

//Sadrzaj za razlicite tipove destinacija
router.get("/:destinacije/:destinacija", DC.jednaDestinacija);
router.get("/:destinacije", DC.sveDestinacije);
router.patch("/:destinacija", DC.pregledanaDestinacija);
//Sadrzaj za specificnu destinaciju
//router.get("/:destinacije/:destinacija", DC.jednaDestinacija);

module.exports = router;
