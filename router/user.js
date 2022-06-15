const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user_id = uuidv4();
  const id = Math.floor(Math.random() * 1000)

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword)

  db.query(
    "INSERT INTO users (user_id, name, email, password, id) VALUES ($1, $2, $3, $4, $5)",
    [user_id, name, email, hashedPassword, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200).json();
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const validPassword = bcrypt.compare(password, result.rows[0].password);
      if (!validPassword) {
        res.status(400).json("Wrong email or password.");
      }
      res.send(result.rows);
    }
  });
});

module.exports = router;
