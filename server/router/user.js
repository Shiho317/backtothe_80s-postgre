const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require('uuid');

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const id = uuidv4();

  db.query(
    "INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)",
    [id, name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success')
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
