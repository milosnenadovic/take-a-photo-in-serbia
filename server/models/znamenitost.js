const mongoose = require("mongoose");

const Schema = mongoose.Schema;

komentarSchema = new Schema({
  sadržaj: { type: String, required: true, minlength: 3 },
  autor: String,
  date: { type: Date, default: Date.now },
});

znamenitostSchema = new Schema(
  {
    naziv: { type: String, required: true },
    opis: { type: String, required: true },
    tagovi: [String],
    komentari: [komentarSchema],
    video: String,
  },
  { collection: "znamenitosti" }
);

const ModelClassZnamenitost = mongoose.model("Znamenitost", znamenitostSchema);

module.exports = ModelClassZnamenitost;
