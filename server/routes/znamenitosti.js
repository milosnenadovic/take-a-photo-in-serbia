const router = require("express").Router();
const ZC = require("../controllers/ZnamenitostController");

router.get("/", ZC.getZnamenitosti);
router.get("/:znamenitost", ZC.getZnamenitost);

router.post("/komentari/:znamenitost", ZC.dodajKomentar);

module.exports = router;
