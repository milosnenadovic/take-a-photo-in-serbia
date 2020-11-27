const mongoose = require("mongoose");

const Schema = mongoose.Schema;

gradoviSchema = new Schema(
  {
    naziv: { type: String, required: true },
    pregledi: { type: Number, required: true, default: 0 },
    opis: String,
  },
  { collection: "gradovi" }
);

const ModelClassGradovi = mongoose.model("Gradovi", gradoviSchema);

module.exports = ModelClassGradovi;