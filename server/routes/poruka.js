const router = require("express").Router();
const Poruka = require("../models/poruka");
const nodemailer = require("nodemailer");

const posaljiPotvrdu = (email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "takeaphotoinserbia@gmail.com",
      pass: "TakeAPhotoinSerbia2020#",
    },
  });

  let opcije = {
    from: "takeaphotoinserbia@gmail.com",
    to: email,
    subject: "Potvrdni email",
    html: `<h2>Zdravo korisniče!</h2><div>Uspešno ste poslali poruku! Hvala! Vaša poruka će biti obrađena u najbržem roku.<br/></div><br/><div></div>`,
  };

  transporter.sendMail(opcije, (err, info) => {
    if (err) {
      console.log("err: " + err);
    } else {
      console.log("info: " + info.response);
    }
  });
};

router.post("/", async (req, res) => {
  const { email, poruka, registrovanKorisnik } = req.body;
  console.log(
    `email: ${email}, poruka: ${poruka}, registrovanKorisnik: ${registrovanKorisnik}`
  );

  if (email.length > 4 && poruka.length > 1) {
    let novaPoruka = new Poruka({
      email,
      poruka,
      registrovanKorisnik,
      tip: 0,
      vreme: new Date().toString(),
    });
    novaPoruka
      .save()
      .then(() => {
        res.status(200).json({
          msg: `Poruka uspesno poslata! Potvrdni email ce biti poslat na adresu: ${email}`,
        });
        posaljiPotvrdu(email);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    res.status(200).json({
      msg: `Poruka koju zelite poslati nije ispravna! Proveriti ispravnost email adrese i broj karaktera u poruci!`,
    });
  }
});

module.exports = router;
