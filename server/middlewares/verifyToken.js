const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authorization");
  if (!token) return res.status(401).send("Access Denied");
  /*jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );*/
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
