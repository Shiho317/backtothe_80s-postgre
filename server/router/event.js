const router = require("express").Router();
const db = require("../services/db");

router.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result);
  });
});

router.post("/create", (req, res) => {
  const title = "title";
  const sub = "desc";
  const image = "https://cdn3.pitchfork.com/longform/639/1980s_Albums.jpg";
  const date = "dec";
  const people = 5;
  const amount = 0;
  const price = 23;
  db.query(
    "INSERT INTO events (title, sub, image, date, people, amount, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, sub, image, date, people, amount, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200).json();
      }
    }
  );
});

router.post("/userevents", (req, res) => {
  const email = req.body.email

  db.query("SELECT * FROM events WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result);
  })
})

module.exports = router;
