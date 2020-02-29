const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// #######
// ROUTING
// #######


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
