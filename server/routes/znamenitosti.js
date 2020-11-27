const router = require("express").Router();
const ZC = require("../controllers/ZnamenitostController");

router.get("/", ZC.getSveZnamenitosti);
router.get("/:lokacija", ZC.getZnamenitosti);

router.post("/komentari/:znamenitost", ZC.dodajKomentar);

module.exports = router;
