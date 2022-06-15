const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const eventRouter = require("./router/event");
const userRouter = require("./router/user");
const peopleRouter = require("./router/people");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/event", eventRouter);
app.use("/api/user", userRouter);
app.use("/api/people", peopleRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("server is running: " + PORT));
