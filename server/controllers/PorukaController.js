const Poruka = require("../models/poruka");
const nodemailer = require("nodemailer");

const posaljiPotvrdu = (email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
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
      return false;
    } else {
      console.log("info: " + info.response);
      return true;
    }
  });
};

exports.posaljiPoruku = async (req, res) => {
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
        let potvrda = posaljiPotvrdu(email);
        if (potvrda) {
          res.status(200).json({
            msg: `Poruka uspešno poslata! Potvrdni email će biti poslat na adresu: ${email}.`,
          });
        } else {
          res.status(200).json({
            msg: "Poruka uspešno poslata!",
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          msg: "Poruka koju ste poslali nije uspešno sačuvana!",
        })
      );
  } else {
    res.status(200).json({
      msg:
        "Poruka koju zelite poslati nije ispravna! Proveriti ispravnost email adrese i broj karaktera u poruci!",
    });
  }
};
