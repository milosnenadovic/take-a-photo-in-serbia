const Korisnik = require("../models/korisnik");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const Slika = require("../models/slika");

// Vraća listu svih korisnika
exports.getKorisnici = async (req, res) => {
  const korisnici = await Korisnik.find();
  res.json(korisnici);
};

// Vraća korisnika iz baze sa prosleđenim id-em
exports.getKorisnik = async (req, res) => {
  const korisnik = await Korisnik.findById(req.params.id);
  if (korisnik) {
    res.json(korisnik);
  } else {
    res.status(400).json({
      msg: `Korisnik sa datim korisnickim imenom: ${req.params.id} nije pronadjen!`,
    });
  }
};

// Registracija korisnika - dodaje ga u bazu
exports.dodajKorisnik = (req, res) => {
  const emailKorisnika = req.body.email;
  const passwordKorisnika = req.body.password;
  Korisnik.findOne({ email: emailKorisnika }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "E-mail se već koristi!" });
    }
    const noviKorisnik = new Korisnik({
      email: emailKorisnika,
      password: passwordKorisnika,
      refreshTokens: [],
    });
    noviKorisnik
      .save()
      .then(() =>
        res.json({
          msg: "Uspešno ste registrovani! Sada se možete ulogovati.",
          korisnik: noviKorisnik,
        })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

// Logovanje korisnika
exports.loginKorisnik = (req, res) => {
  const emailKorisnika = req.body.email;
  const passwordKorisnika = req.body.password;
  Korisnik.findOne({ email: emailKorisnika }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (!existingUser) {
      return res.status(422).send({ error: "E-mail ne postoji!" });
    } else {
      bcrypt.compare(
        passwordKorisnika,
        existingUser.password,
        (err, isMatch) => {
          if (err) return next(err);
          if (isMatch) {
            const token = jwt.sign(
              { _id: existingUser._id },
              process.env.TOKEN_SECRET
            );
            const refreshToken = jwt.sign(
              { _id: existingUser._id },
              process.env.REFRESH_TOKEN_SECRET
            );
            existingUser.refreshTokens.push(refreshToken);
            existingUser
              .save()
              .then(() => {
                res.header("authorization", token);
                return res.status(200).json({
                  msg: "Ulogovani ste!",
                  korisnik: existingUser,
                  token,
                  refreshToken,
                });
              })
              .catch((err) => res.status(400).json("Error: " + err));
          } else {
            res.status(200).json({
              msg: "Neispravna lozinka!",
            });
          }
        }
      );
    }
  });
};

// Odjava korisnika
exports.logoutKorisnik = async (req, res) => {
  const users = await Korisnik.find();
  const validUser = await users.find((korisnik) =>
    korisnik.refreshTokens.includes(req.body.token)
  );
  if (!validUser) {
    return res.sendStatus(403);
  } else {
    const ind = validUser.refreshTokens.indexOf(req.body.token);
    if (ind > -1) validUser.refreshTokens.splice(ind, 1);
    validUser
      .save()
      .then(() => {
        return res.status(200).json({
          msg: "Korisnik izlogovan!",
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
};

// Update podataka korisnika
exports.updateKorisnik = async (req, res) => {
  let email = req.body.email;
  let podaci = req.body;
  if (!req.files) {
    console.log("Nema fajlova!");
    if (Object.keys(podaci).length > 1) {
      let noviKorisnik = await Korisnik.findOneAndUpdate({ email }, podaci, {
        new: true,
      });
      res
        .status(200)
        .json({ korisnik: noviKorisnik, msg: "Uspešno se izmenili podatke!" });
    } else {
      res.status(403).json({ msg: "Nemate potrebne podatke za update!" });
    }
  } else {
    const { slika } = req.files;
    let ext = path.extname(slika.name);
    try {
      slika.mv("../korisnici/korisnik_" + podaci.email + ext);
    } catch (e) {
      res.status(500).send(e);
    }
    podaci.slika = true;
    let noviKorisnik = await Korisnik.findOneAndUpdate({ email }, podaci, {
      new: true,
    });
    let folderKorisnici = path.join(__dirname.split("server")[0], "korisnici");
    fs.readdir(folderKorisnici, (err, files) => {
      console.log("Files: ");
      console.log(files);
      if (err) {
        console.log("Nije moguće izlistati direktorijum.", err);
        res.status(200).json({
          korisnik: noviKorisnik,
          msg: "Serverska greška! Pokusajte ponovo!",
        });
        process.exit(1);
      }
      files.forEach(async (file) => {
        let nazivSlike = "korisnik_" + podaci.email + ext;
        console.log(file + " " + nazivSlike);
        if (file === nazivSlike) {
          let mimeType = file.contentType;
          if (!mimeType) {
            mimeType = mime.lookup(file);
          }
          if ((await Slika.findOne({ naziv: file.split(ext)[0] })) === null) {
            console.log("Slika ne postoji u bazi");
            var newImg = fs.readFileSync(folderKorisnici.concat("\\", file));
            var encImg = newImg.toString("base64");
            var newItem = new Slika({
              naziv: file.split(ext)[0],
              opis: ".",
              date: new Date(),
              contentType: mimeType,
              img: Buffer.from(encImg, "base64"),
            });
            newItem
              .save()
              .then(() => {
                console.log("Slika " + file + " je uneta u bazu!");
                res.status(200).json({
                  korisnik: noviKorisnik,
                  msg: "Uspešno ste izmenili podatke!",
                });
              })
              .catch((err) => res.status(400).json("Error: " + err));
          } else {
            let slika = await Slika.findOne({ naziv: file.split(ext)[0] });
            let newImg = fs.readFileSync(folderKorisnici.concat("\\", file));
            if (
              Buffer.from(slika.img.buffer, "base64").equals(
                Buffer.from(newImg.toString("base64"), "base64")
              )
            ) {
              res.status(200).json({
                korisnik: noviKorisnik,
                msg: "Slika je ista! Ostali podaci su izmenjeni!",
              });
            } else {
              Slika.findOneAndDelete({ naziv: file.split(ext)[0] }, (err) => {
                if (err) console.log(err);
                var newImg = fs.readFileSync(
                  folderKorisnici.concat("\\", file)
                );
                var encImg = newImg.toString("base64");
                var newItem = new Slika({
                  naziv: file.split(ext)[0],
                  opis: "Profilna slika korisnika.",
                  date: new Date(),
                  contentType: mimeType,
                  img: Buffer.from(encImg, "base64"),
                });
                newItem
                  .save()
                  .then(() => {
                    console.log("Nova slika " + file + " je uneta u bazu!");
                    res.status(200).json({
                      korisnik: noviKorisnik,
                      msg: "Izmene su uspešne!",
                    });
                  })
                  .catch((err) =>
                    res.status(400).json({
                      korisnik: noviKorisnik,
                      msg: `Podaci o korisniku su sačuvani. Problem pri čuvanje slike: ${err}`,
                    })
                  );
              });
            }
          }
        }
      });
    });
  }
};

// Uklanjanje korisnika iz baze
exports.deleteKorisnik = (req, res) => {
  Korisnik.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Korisnik uklonjen." }))
    .catch((err) =>
      res
        .status(400)
        .json({ msg: `Greška: ${err}. Korisnik nije pronađen u bazi.` })
    );
};
