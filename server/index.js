const fs = require("fs");
const path = require("path");
const mime = require("mime");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Slika = require("./models/slika");
const Destinacija = require("./models/destinacija");
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

//Pocetak aplikacije - prva informacija koja se salje na browser
app.get("/", async (req, res) => {
  let topLista = [];
  let lista = [];
  let destinacije = await Destinacija.find();
  destinacije.forEach((destinacija) => {
    let listaKategorije = [];
    var top = destinacija.sadržaj[0];
    destinacija.sadržaj.forEach((des) => {
      listaKategorije.push(des.naziv);
      if (des.pregledi > top.pregledi) top = des;
    });
    topLista.push(top);
    lista.push(listaKategorije);
  });
  res.status(200).json({ topLista, lista });
});

//Definisanje vrednosti porta na kojem ce server osluskivati dogadjaje
const PORT = process.env.PORT || 5000;

//Podesavanje baze podataka
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

//Logovanje uspesne konekcije i vremena
const konekcija = mongoose.connection;
konekcija.on("connected", () =>
  console.log(
    `Konekcija na bazu ostvarena u ${new Date().toLocaleTimeString()}`
  )
);

//Ucitavanja slika dodatih u folder - a ne postoje u bazi
let folderGalerija = path.join(__dirname.split("server")[0], "galerija");
konekcija.once("open", () => {
  fs.readdir(folderGalerija, (err, files) => {
    if (err) {
      console.log("Nije moguce izlistati direktorijum.", err);
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
        var newItem = new Slika({
          naziv: file.split(".")[0],
          opis: ".",
          date: new Date(),
          contentType: mimeType,
          img: Buffer.from(encImg, "base64"),
        });
        newItem
          .save()
          .then(() => console.log("Slika " + file + " je uneta u bazu!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    });
  });
});
