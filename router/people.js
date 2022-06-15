const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");

router.post("/join", (req, res) => {
  const id = Math.floor(Math.random() * 1000);
  const username = req.body.username;
  const useremail = req.body.useremail;
  const event = req.body.event;
  const amount = req.body.amount;

  db.query(
    "INSERT INTO people (username, useremail, event, id) VALUES ($1, $2, $3, $4)",
    [username, useremail, event, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "UPDATE events SET amount = $1 WHERE id = $2",
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

  db.query("SELECT * FROM people WHERE event = $1", [event], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result.rows);
  });
});

module.exports = router;
