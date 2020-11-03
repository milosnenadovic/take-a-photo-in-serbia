const router = require("express").Router();
const Znamenitosti = require("../models/znamenitost");

router.get("/", async (req, res) => {
  const znamenitosti = await Znamenitosti.find();
  if (!znamenitosti) {
    res.status(404).json({
      msg: `Ne postoje znamenitosti`,
    });
  } else {
    res.status(200).json(znamenitosti);
  }
});

router.get("/:destinacija", async (req, res) => {
  let destinacija = req.params.destinacija.split("_").join(" ");
  const sveZnamenitosti = await Znamenitosti.find();
  if (!sveZnamenitosti) {
    res.status(404).json({
      msg: `Ne postoje znamenitosti`,
    });
  } else {
    let znamenitosti = [];
    sveZnamenitosti.forEach((znam) => {
      if (znam.tagovi.includes(destinacija)) {
        znamenitosti.push(znam);
      }
    });
    if (znamenitosti.length > 0) {
      res.status(200).json(znamenitosti);
    } else {
      sveZnamenitosti.forEach((znam) => {
        if (znam.naziv.toLowerCase() === destinacija) {
          znamenitosti.push(znam);
        }
      });
      res.status(200).json(znamenitosti);
    }
  }
});

router.post("/komentari/:znamenitost", async (req, res) => {
  const lokacija = req.params.znamenitost.split("_").join(" ");
  const filter = new RegExp(`^${lokacija}$`, "i");
  const parametri = req.body;
  const znamenitost = await Znamenitosti.findOne({
    naziv: { $regex: filter },
  });
  if (!znamenitost) {
    res.status(404).json({
      msg: `Ne postoji znamenitost pod nazivom ${znamenitosti}`,
    });
  } else {
    let kom = {
      sadržaj: parametri.komentar,
      autor: parametri.korisnik.email,
      vreme: new Date().toString(),
    };
    znamenitost.komentari.push(kom);
    znamenitost.save().then(() => {
      console.log(
        "komentar korisnika " + parametri.korisnik.email + " je sacuvan!"
      );
      res.status(200).json({
        msg: `Komentar korisnika ${parametri.korisnik.email} je sacuvan!`,
        komentar: znamenitost.komentari,
      });
    });
  }
});

module.exports = router;
