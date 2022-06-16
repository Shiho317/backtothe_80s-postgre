const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");

router.get("/events", (req, res) => {
  db.query("SELECT * FROM events ORDER BY date DESC", (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result.rows);
  });
});

router.post("/create", (req, res) => {
  const id = Math.floor(Math.random() * 1000);
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
  const event_id = uuidv4();

  db.query(
    "INSERT INTO events (title, sub, date, time, location, participants, amount, price, image, host, id, event_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    [
      title,
      sub,
      date,
      time,
      location,
      participants,
      amount,
      price,
      image,
      host,
      id,
      event_id
    ],
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
  const host = req.body.email;

  db.query("SELECT * FROM events WHERE host = $1", [host], (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result.rows);
  });
});

router.post("/userevents-manage", (req, res) => {
  const id = req.body.param;
  const host = req.body.email;

  db.query(
    "SELECT * FROM events WHERE event_id = $1 AND host = $2",
    [id, host],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result.rows);
    }
  );
});

router.post("/getevent", (req, res) => {
  const id = req.body.id;

  db.query("SELECT * FROM events WHERE event_id = $1", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result.rows);
  });
});

router.post("/edit", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const sub = req.body.subtitle;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const participants = req.body.participants;
  const price = req.body.price;
  const image = req.body.image;

  db.query(
    "UPDATE events SET title = $1, sub = $2, date = $3, time = $4, location = $5, participants = $6, price = $7, image = $8 WHERE event_id = $9",
    [title, sub, date, time, location, participants, price, image, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200).json();
      }
    }
  );
});

module.exports = router;
