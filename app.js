const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
//LOAD env
dotenv.config({ path: "./config.env" });

//Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v2/profile/steam", require("./routes/profile"));

//Handle production
if (process.env.NODE_ENV === "production") {
  //set static folder'
  app.use(express.static(__dirname + "/public"));

  //Handle spa
  app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });
}
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server ${port} Has Started! ${process.env.NODE_ENV}`);
});

console.log([process.env.API_TRACKER_URL]);
//76561198249008602
