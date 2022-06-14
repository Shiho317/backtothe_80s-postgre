const router = require("express").Router();
const db = require("../services/db");
const { v4: uuidv4 } = require('uuid');

router.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result);
  });
});

router.post("/create", (req, res) => {
  const id = uuidv4();
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
    "INSERT INTO events (id, title, sub, date, time, location, participants, amount, price, image, host) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, title, sub, date, time, location, participants, amount, price, image, host],
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

  db.query('UPDATE events SET title = ?, sub = ?, date = ?, time = ?, location = ?, participants = ?, price = ?, image = ? WHERE id = ?', [title, sub, date, time, location, participants, price, image, id], (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.sendStatus(200).json();
    }
  })
})

module.exports = router;
