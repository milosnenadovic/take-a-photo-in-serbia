const router = require("express").Router();
const KC = require("../controllers/KorisnikController");

router.get("/", KC.getKorisnici);
router.get("/:id", KC.getKorisnik);

router.post("/", KC.dodajKorisnik);
router.post("/login", KC.loginKorisnik);
router.post("/logout", KC.logoutKorisnik);

router.patch("/update", KC.updateKorisnik);
router.delete("/:id", KC.deleteKorisnik);

module.exports = router;
