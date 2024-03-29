const fs = require("fs");
const path = require("path");
const mime = require("mime");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Slika = require("./models/slika");
const Reke = require("./models/reke");
const Jezera = require("./models/jezera");
const Planine = require("./models/planine");
const Gradovi = require("./models/gradovi");
const Destinacije = require("./models/destinacije");
require("dotenv").config();

//Kreiranje Express.js aplikacije
const app = express();

//Aplikaciona logika
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({ createParentPath: true }));

//Rute
app.use("/korisnici", require("./routes/korisnici"));
app.use("/destinacije", require("./routes/destinacije"));
app.use("/znamenitosti", require("./routes/znamenitosti"));
app.use("/poruka", require("./routes/poruka"));
app.use("/slike", require("./routes/slike"));

//Početak aplikacije - prva informacija koja se šalje na browser: 
//lista naziva destinacija i top lista za destinacije
app.get("/", async (req, res) => {
  let lista = [];
  let topLista = [];
  let topReka = await Reke.find().sort({ pregledi: -1 }).limit(1);
  let topJezero = await Jezera.find().sort({ pregledi: -1 }).limit(1);
  let topPlanina = await Planine.find().sort({ pregledi: -1 }).limit(1);
  let topGrad = await Gradovi.find().sort({ pregledi: -1 }).limit(1);
  topLista = [topReka[0], topJezero[0], topPlanina[0], topGrad[0]];
  let destinacije = await Destinacije.find();
  destinacije.forEach((des) => {
    lista.push(des.sadržaj);
  });
  res.status(200).json({ topLista: topLista, lista: lista });
});

//Definisanje vrednosti porta na kojem će server osluškivati događaje
const PORT = process.env.PORT || 5000;

//Podešavanje opcija za konekciju na bazu podataka
const opcije = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

//Konekcija na bazu
mongoose
  .connect(process.env.DB_CONNECTION, opcije)
  .then(() =>
    app.listen(PORT, () => console.log("Server je pokrenut na portu: " + PORT))
  )
  .catch((error) => console.log(error));

//Logovanje uspešne konekcije i vremena
const konekcija = mongoose.connection;
konekcija.on("connected", () =>
  console.log(
    `Konekcija na bazu ostvarena u ${new Date().toLocaleTimeString()}`
  )
);

//Učitavanja slika dodatih u folder - a ne postoje u bazi
let folderGalerija = path.join(__dirname.split("server")[0], "galerija");
konekcija.once("open", () => {
  fs.readdir(folderGalerija, (err, files) => {
    if (err) {
      console.log("Nije moguće izlistati direktorijum.", err);
      process.exit(1);
    }
    files.forEach(async (file) => { 
      let mimeType = file.contentType;
      if (!mimeType) {
        mimeType = mime.getType(file);
      }
      if ((await Slika.findOne({ naziv: file.split(".")[0] })) === null) {
        var newImg = fs.readFileSync(folderGalerija.concat("\\", file));
        var encImg = newImg.toString("base64");
        var novaSlika = new Slika({
          naziv: file.split(".")[0],
          opis: ".",
          date: new Date(),
          contentType: mimeType,
          img: Buffer.from(encImg, "base64"),
        });
        novaSlika
          .save()
          .then(() => console.log("Slika " + file + " je uneta u bazu!"))
          .catch((err) => res.status(400).json("Greška: " + err));
      }
    });
  });
});
