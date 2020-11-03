const mongoose = require("mongoose");

const Schema = mongoose.Schema;

porukaSchema = new Schema(
  {
    poruka: { type: String, required: true },
    email: { type: String, required: true },
    vreme: { type: Date, default: Date.now },
    tip: Number,
    registrovanKorisnik: Boolean,
  },
  { collection: "poruke" }
);

const ModelClassPoruka = mongoose.model("Poruka", porukaSchema);

module.exports = ModelClassPoruka;
