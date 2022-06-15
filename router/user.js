const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const id = uuidv4();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  db.query(
    "INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)",
    [id, name, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        res.sendStatus(200).json();
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const validPassword = bcrypt.compare(password, result[0].password);
      if (!validPassword) {
        res.status(400).json("Wrong email or password.");
      }
      res.send(result);
    }
  });
});

module.exports = router;
