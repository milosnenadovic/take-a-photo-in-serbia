const mongoose = require("mongoose");

const Schema = mongoose.Schema;

planineSchema = new Schema(
  {
    naziv: { type: String, required: true },
    pregledi: { type: Number, required: true, default: 0 },
    opis: String,
  },
  { collection: "planine" }
);

const ModelClassPlanine = mongoose.model("Planine", planineSchema);

module.exports = ModelClassPlanine;
