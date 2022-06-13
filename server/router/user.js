const router = require("express").Router();
const db = require("../services/db");

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200).json();
      }
    }
  );
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result) {
          res.send(result);
        } else {
          res.send("User is not existed.");
        }
      }
    }
  );
});

module.exports = router;
