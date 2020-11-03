const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv/config");
const Korisnik = require("../models/korisnik");

router.post("/", async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  const users = await Korisnik.find();
  console.log(users);
  const validUser = await users.find((korisnik) =>
    korisnik.refreshTokens.includes(refreshToken)
  );
  if (!validUser) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const token = jwt.sign({ _id: validUser._id }, process.env.TOKEN_SECRET);
    res.json({ token });
  });
});

module.exports = router;
