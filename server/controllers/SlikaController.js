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
              console.log(error);
              res.status(200).json({ err: "Slika nije pronadjena" });
            }
          });
        }
      }
    }
  );
};
