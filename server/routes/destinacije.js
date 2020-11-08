const router = require("express").Router();
const DC = require("../controllers/DestinacijaController");

//Sadrzaj za specificnu destinaciju
router.get("/:destinacije/:destinacija", DC.jednaDestinacija);
//Sadrzaj za razlicite tipove destinacija
router.get("/:destinacije", DC.sveDestinacije);

module.exports = router;
