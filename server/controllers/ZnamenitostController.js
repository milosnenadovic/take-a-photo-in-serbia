const Znamenitost = require("../models/znamenitost");
const Destinacija = require("../models/destinacije");

// Sve znamenitosti iz baze
exports.getSveZnamenitosti = async (req, res) => {
  const znamenitosti = await Znamenitost.find();
  if (!znamenitosti) {
    res.status(404).json({
      msg: `Ne postoje znamenitosti`,
    });
  } else {
    res.status(200).json(znamenitosti);
  }
};

// Znamenitosti vezane za određenu destinaciju
exports.getZnamenitosti = async (req, res) => {
  let lokacija = req.params.lokacija.split("_").join(" ");
  let sveZnamenitosti = await Znamenitost.find();
  if (!sveZnamenitosti) {
    console.log("Greška pri učitavnju iz kolekcije 'znamenitosti'.");
    res.status(404).json({
      msg: `Greška pri učitavanju iz baze.`,
    });
  } else {
    let znamenitosti = [];
    sveZnamenitosti.forEach((znam) => {
      if (znam.tagovi.includes(lokacija)) znamenitosti.push(znam);
    });
    // Ukoliko postoje znamenitosti za prosleđenu lokaciju
    if (znamenitosti.length > 0) {
      res.status(200).json(znamenitosti);
    } else {
      sveZnamenitosti.forEach((znam) => {
        if (znam.naziv.toLowerCase() === lokacija) {
          znamenitosti.push(znam);
        }
      });
      // Ako znamenitost koja je prosleđena kroz URL ne postoji u bazi
      if (znamenitosti.length === 0) {
        res
          .status(404)
          .json({ msg: `Znamenitost koju tražite ne postoji u bazi.` });
      } else {
        res.status(200).json(znamenitosti);
      }
    }
  }
};

// Dodavanje komentara korisnika za određenu lokaciju
exports.dodajKomentar = async (req, res) => {
  const lokacija = req.params.znamenitost.split("_").join(" ");
  const filter = new RegExp(`^${lokacija}$`, "i");
  const parametri = req.body;
  const znamenitost = await Znamenitost.findOne({
    naziv: { $regex: filter },
  });
  if (!znamenitost) {
    res.status(404).json({
      msg: `Ne postoji znamenitost pod nazivom ${znamenitosti}.`,
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
        "Komentar korisnika " + parametri.korisnik.email + " je sačuvan!"
      );
      res.status(200).json({
        msg: `Komentar je sačuvan!`,
        komentar: znamenitost.komentari,
      });
    });
  }
};
