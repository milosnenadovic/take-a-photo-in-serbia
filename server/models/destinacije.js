const mongoose = require("mongoose");

const Schema = mongoose.Schema;

destinacijeSchema = new Schema(
  {
    tip: { type: String, required: true },
    sadržaj: [String],
  },
  { collection: "destinacije" }
);

const ModelClassDestinacije = mongoose.model("Destinacije", destinacijeSchema);

module.exports = ModelClassDestinacije;
