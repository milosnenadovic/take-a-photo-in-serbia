const mongoose = require("mongoose");

const Schema = mongoose.Schema;

jezeraSchema = new Schema(
  {
    naziv: { type: String, required: true },
    pregledi: { type: Number, required: true, default: 0 },
    opis: String,
    znamenitosti: [String],
  },
  { collection: "jezera" }
);

const ModelClassJezera = mongoose.model("Jezera", jezeraSchema);

module.exports = ModelClassJezera;