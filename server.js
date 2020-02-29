//Constants
const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));




// #######
// ROUTING
// #######


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Save note route

app.post('/api/notes', function (req, res) {
  let newNote = req.body

  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;

    let notesArray = JSON.parse(data);

    notesArray.push(newNote)
    console.log(notesArray)

    fs.writeFile("db/db.json", JSON.stringify(notesArray), 'utf8', (err) =>{
      if (err) throw err;
      console.log('New Notes have been saved')
    })
  })
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
