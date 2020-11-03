const https = require("https");
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Slika = require("./models/slika");
const Destinacija = require("./models/destinacija");
require("dotenv/config");
const fileUpload = require("express-fileupload");

const app = express();

//Podesavanje baze podataka
const opcije = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.DB_CONNECTION, opcije);

const konekcija = mongoose.connection;

konekcija.on("connected", () =>
  console.log(
    `Konekcija na bazu ostvarena u ${new Date().toLocaleTimeString()}`
  )
);

let folderGalerija = path.join(__dirname.split("server")[0], "galerija");

let folderKorisnici = path.join(__dirname.split("server")[0], "korisnici");

konekcija.once("open", () => {
  fs.readdir(folderGalerija, (err, files) => {
    if (err) {
      console.log("Nije moguce izlistati direktorijum.", err);
      process.exit(1);
    }
    files.forEach(async (file) => {
      let mimeType = file.contentType;
      if (!mimeType) {
        mimeType = mime.lookup(file);
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

//Aplikaciona logika
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Rute
//app.use("/tokeni", require("./routes/tokeni"));

//Ruta za korisnike
app.use("/korisnici", require("./routes/korisnici"));
//Ruta za destinacije
app.use("/destinacije", require("./routes/destinacije"));
//Ruta za znamenitosti
app.use("/znamenitosti", require("./routes/znamenitosti"));
//Ruta za poruke
app.use("/poruka", require("./routes/poruka"));

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

app.get("/slike/:slika", async (req, res) => {
  let filename = req.params.slika;
  await Slika.findOne(
    { naziv: filename.replace(" ", "_").toLowerCase() },
    (err, results) => {
      if (results !== null) {
        res.setHeader("content-type", results.contentType);
        let buff = Buffer.from(results.img.buffer, "base64");
        res.send(buff);
      } else {
        console.log("Naziv slike koja nije pronadjena: ", filename);
        res.status(200).json({ err: "Slika nije pronadjena" });
      }
    }
  );
});

//Kreiranje https servera
const sslServer = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, "ssl", "server.pem")),
    key: fs.readFileSync(path.join(__dirname, "ssl", "server.key")),
    ca: fs.readFileSync(path.join(__dirname, "ssl", "ca.pem")),
  },
  app
);

//Kreiranje servera
//const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

sslServer.listen(PORT, () =>
  console.log("Server je pokrenut... Port: " + PORT)
);
