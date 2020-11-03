const mongoose = require("mongoose");

const Schema = mongoose.Schema;

destinacijaSchema = new Schema(
  {
    tip: { type: String, required: true },
    sadržaj: { type: { naziv: String, pregledi: Number }, required: true },
    /*naziv: { type: String, required: true },
    opstina: String,
    opis: String,
    lokaliteti: {
      type: {
        nazivLokaliteta: String,
        opisLokaliteta: String,
        fotoLokaliteta: { data: Buffer, contentType: String },
        komentari: {
          korisnickoIme: { type: String, required },
          sadrzaj: { type: String, maxLength: 100 },
          fotoKorisnika: { data: Buffer, contentType: String },
        },
      },
    }
    foto: { data: Buffer, contentType: String },
    komentari: {
      korisnickoIme: { type: String, required },
      sadrzaj: { type: String, maxLength: 100 },
      fotoKorisnika: { data: Buffer, contentType: String },
    }*/
  },
  { collection: "destinacije" }
);

const ModelClassDestinacija = mongoose.model("Destinacija", destinacijaSchema);

module.exports = ModelClassDestinacija;
