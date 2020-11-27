const Reke = require("../models/reke");
const Jezera = require("../models/jezera");
const Planine = require("../models/planine");
const Gradovi = require("../models/gradovi");

// Vraća sve destinacije zadatog tipa
exports.getDestinacije = async (req, res) => {
  const tip = req.params.tip;
  let destinacije;
  switch (tip) {
    case "reke":
      destinacije = await Reke.find();
      break;
    case "jezera":
      destinacije = await Jezera.find();
      break;
    case "planine":
      destinacije = await Planine.find();
      break;
    case "gradovi":
      destinacije = await Gradovi.find();
      break;
    default:
      destinacije = null;
  }
  if (!destinacije) {
    res.status(404).json({
      msg: `Ne postoji sekcija za destinacije: ${tip}.`,
    });
  } else {
    res.status(200).json(destinacije);
  }
};

// Vraća određenu destinaciju
exports.getDestinacija = async (req, res) => {
  let tip = req.params.tip;
  let naziv = req.params.destinacija.split("_").join(" ");
  let filter = new RegExp(`^${naziv}$`, "i");
  let destinacija = null;
  switch (tip) {
    case "reke":
      destinacija = await Reke.findOne({ naziv: { $regex: filter } });
      break;
    case "jezera":
      destinacija = await Jezera.find({ naziv: { $regex: filter } });
      break;
    case "planine":
      destinacija = await Planine.find({ naziv: { $regex: filter } });
      break;
    case "gradovi":
      destinacija = await Gradovi.find({ naziv: { $regex: filter } });
      break;
    default:
      destinacija = null;
  }
  if (!destinacija) {
    res.status(404).json({
      msg: `Ne postoji destinacija: ${naziv}!`,
    });
  } else {
    res.status(200).json(destinacija);
  }
};
