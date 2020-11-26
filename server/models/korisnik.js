const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const korisnikSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    ime: String,
    prezime: String,
    mesto: String,
    slika: Boolean,
    /*aktivan: { type: Boolean, default: false },
    telefon: { type: String },*/
    refreshTokens: [String],
  },
  { collection: "korisnici" }
);

korisnikSchema.pre("save", function (next) {
  const korisnik = this;
  if (korisnik.password.length < 32) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(korisnik.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }

        korisnik.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

korisnikSchema.methods.comparePassword = function (
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const ModelClassKorisnik = mongoose.model("Korisnik", korisnikSchema);

module.exports = ModelClassKorisnik;
