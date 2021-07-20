const Poruka = require("../models/poruka");

const posaljiPotvrdu = (email) => {
  const mailjet = require("node-mailjet").connect(
    MAILJET_APIKEY_MAIL,
    MAILJET_APIKEY_PASSWORD
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.USER_EMAIL,
          Name: "Take-A-Photo-In-Serbia",
        },
        To: [
          {
            Email: email,
            Name: "Primalac",
          },
        ],
        Subject: "Potvrdni mail",
        HTMLPart: `<h2>Zdravo korisniče!</h2><div>
      Uspešno ste poslali poruku! Hvala! Vaša poruka će biti obrađena u najbržem roku.<br/>
      </div><br/><div></div>`,
        CustomID: "takeaphotoinserbia",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
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
      msg: "Poruka koju zelite poslati nije ispravna! Proveriti ispravnost email adrese i broj karaktera u poruci!",
    });
  }
};
