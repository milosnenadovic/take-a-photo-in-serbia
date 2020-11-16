const Destinacija = require("../models/destinacija");

exports.sveDestinacije = async (req, res) => {
  const naziv =
    req.params.destinacije.charAt(0).toUpperCase() +
    req.params.destinacije.slice(1);
  const destinacije = await Destinacija.findOne({
    tip: naziv,
  });

  if (!destinacije) {
    res.status(404).json({
      msg: `Ne postoji sekcija za destinacije: ${req.params.destinacije}`,
    });
  } else {
    res.status(200).json(destinacije);
  }
};

exports.jednaDestinacija = async (req, res) => {
  //uvecanje pregleda destinacije
  const naziv = req.params.destinacija.split("_").join(" ");
  const filter = new RegExp(`^${naziv}$`, "i");
  const dokument = await Destinacija.findOne({
    sadržaj: { $elemMatch: { naziv: { $regex: filter } } },
  });
  if (dokument) {
    const destinacija = dokument["sadržaj"].filter(
      (d) => d.naziv.toLowerCase() === naziv
    );
    destinacija[0].pregledi++;
    await Destinacija.updateOne(
      {
        sadržaj: { $elemMatch: { naziv: { $regex: filter } } },
      },
      { $set: { "sadržaj.$.pregledi": destinacija[0].pregledi } },
      {
        new: true,
      }
    );
    const destinacije = await Destinacija.findOne({
      tip:
        req.params.destinacije.charAt(0).toUpperCase() +
        req.params.destinacije.slice(1),
    });
    if (!destinacije) {
      res.status(404).json({
        msg: `Ne postoji sekcija za destinacije: ${req.params.destinacije}!`,
      });
    } else {
      const destinacija = await destinacije.sadržaj.filter(
        (des) =>
          des.naziv.toLowerCase() ===
          req.params.destinacija.split("_").join(" ")
      );
      if (!destinacija) {
        res.status(404).json({
          msg: `Ne postoji destinacija: ${req.params.destinacija}, u sekciji ${req.params.destinacije}!`,
        });
      } else {
        res.status(200).json(destinacija);
      }
    }
  } else {
    res.status(404).json({ msg: "404" });
  }
};
