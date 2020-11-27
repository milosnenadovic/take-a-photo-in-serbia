const mongoose = require("mongoose");

const Schema = mongoose.Schema;

rekeSchema = new Schema(
  {
    naziv: { type: String, required: true },
    pregledi: { type: Number, required: true, default: 0 },
    opis: String,
  },
  { collection: "reke" }
);

const ModelClassReke = mongoose.model("Reke", rekeSchema);

module.exports = ModelClassReke;
