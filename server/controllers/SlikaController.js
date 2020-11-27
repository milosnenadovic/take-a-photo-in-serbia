const Slika = require("../models/slika");

exports.getSlika = async (req, res) => {
  let filename = req.params.slika;
  await Slika.findOne(
    { naziv: filename.replace(" ", "_").toLowerCase() },
    async (error, results) => {
      if (results !== null && results !== undefined) {
        res.setHeader("content-type", results.contentType);
        let buff = Buffer.from(results.img.buffer, "base64");
        res.send(buff);
      } else {
        if (filename.includes("korisnik_")) {
          await Slika.findOne({ naziv: "korisnik_" }, (err, resl) => {
            if (resl !== null && resl !== undefined) {
              res.setHeader("content-type", resl.contentType);
              let buff = Buffer.from(resl.img.buffer, "base64");
              res.send(buff);
            } else {
              console.log(`Greška pri pronalasku slike za korisnika ${filename.split("korisnik_")[1]}: ${error}`);
              res.status(404).json({ msg: "Slika nije pronađena." });
            }
          });
        } else {
          console.log(`Greška pri pronalasku slike koja nije za korisnika a ne postoji zadati naziv ${filename.replace(" ", "_").toLowerCase()}: ${error}`);
          res.status(404).json({ msg: "Slika ne postoji u bazi." });
        }
      }
    }
  );
};
