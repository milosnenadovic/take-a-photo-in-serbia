const router = require("express").Router();
const KC = require("../controllers/KorisnikController");

router.get("/", KC.sviKorisnici);
router.get("/:id", KC.jedanKorisnik);
router.post("/", KC.dodajKorisnika);
router.post("/login", KC.loginKorisnika);
router.post("/logout", KC.logoutKorisnika);
router.patch("/update", KC.updateKorisnika);
router.delete("/:id", KC.ukloniKorisnika);

module.exports = router;
