const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");

router.post("/join", (req, res) => {
  const id = uuidv4();
  const username = req.body.username;
  const useremail = req.body.useremail;
  const event = req.body.event;
  const amount = req.body.amount;

  db.query(
    "INSERT INTO people (id, username, useremail, event) VALUES (?, ?, ?, ?)",
    [id, username, useremail, event],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "UPDATE events SET amount = ? WHERE id = ?",
          [amount, event],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.sendStatus(200).json();
            }
          }
        );
      }
    }
  );
});

router.post("/getlist", (req, res) => {
  const event = req.body.event;

  db.query("SELECT * FROM people WHERE event = ?", [event], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

module.exports = router;
