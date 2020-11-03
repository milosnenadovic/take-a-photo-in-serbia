const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const slikaSchema = new Schema(
  {
    naziv: { type: String, maxlength: 100 },
    opis: { type: String, maxlength: 255 },
    date: Date,
    contentType: String,
    velicina: Number,
    img: Buffer,
  },
  { collection: "slike" }
);

const ModelClassSlika = mongoose.model("Slika", slikaSchema);

module.exports = ModelClassSlika;
