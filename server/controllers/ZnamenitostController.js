const Znamenitost = require("../models/znamenitost");
const Destinacija = require("../models/destinacija");

exports.getZnamenitosti = async (req, res) => {
  const znamenitosti = await Znamenitost.find();
  if (!znamenitosti) {
    res.status(404).json({
      msg: `Ne postoje znamenitosti`,
    });
  } else {
    res.status(200).json(znamenitosti);
  }
};

exports.getZnamenitost = async (req, res) => {
  let destinacija = req.params.znamenitost.split("_").join(" ");
  const sveZnamenitosti = await Znamenitost.find();
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
      if (znamenitosti.length === 0) {
        const filter = new RegExp(`^${destinacija}$`, "i");
        const dokument = await Destinacija.findOne({
          sadržaj: { $elemMatch: { naziv: { $regex: filter } } },
        });
        if (!dokument) res.json({ msg: "404" });
      } else {
        res.status(200).json(znamenitosti);
      }
    }
  }
};

exports.dodajKomentar = async (req, res) => {
  const lokacija = req.params.znamenitost.split("_").join(" ");
  const filter = new RegExp(`^${lokacija}$`, "i");
  const parametri = req.body;
  const znamenitost = await Znamenitost.findOne({
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
};
