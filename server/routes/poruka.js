const router = require("express").Router();
const PC = require("../controllers/PorukaController");

router.post("/", PC.posaljiPoruku);

module.exports = router;
