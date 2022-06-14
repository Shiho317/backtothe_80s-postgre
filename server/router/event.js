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
  const title = req.body.title;
  const sub = req.body.subtitle;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const participants = req.body.participants;
  const price = req.body.price;
  const image = req.body.image;
  const host = req.body.host;
  const amount = 1;

  db.query(
    "INSERT INTO events (title, sub, date, time, location, participants, amount, price, image, host) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [title, sub, date, time, location, participants, amount, price, image, host],
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
  const host = req.body.email

  db.query("SELECT * FROM events WHERE host = ?", [host], (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result);
  })
})

router.post("/userevents-manage", (req, res) => {
  const id = req.body.param;
  const host = req.body.email;

  db.query("SELECT * FROM events WHERE id = ? AND host = ?", [id, host], (err, result) => {
    if(err){
      console.log(err)
    }
    res.send(result)
  })
})

router.post("/getevent", (req, res) => {
  const id = req.body.id

  db.query("SELECT * FROM events WHERE id = ?", [id], (err, result) => {
    if(err){
      console.log(err)
    }
    res.send(result)
  })
})

module.exports = router;
