//Constants
const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const { uuid } = require('uuidv4');


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
  newNote.id = uuid()
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    let notesArray = JSON.parse(data);
    notesArray.push(newNote)
    fs.writeFile("db/db.json", JSON.stringify(notesArray), 'utf8', (err) =>{
      if (err) throw err;
      console.log('New Notes have been saved')
    })
  })
  res.status(200).end()
});

app.get('/api/notes', function (req, res) {

  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data))
  })
});

//Delete note Route

app.delete('/api/notes/:id', function (req, res) {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    let notesArray = JSON.parse(data);
    let deleteId = req.params.id
    notesArray = notesArray.filter((el, i)=> el.id !== deleteId)

    fs.writeFile("db/db.json", JSON.stringify(notesArray), 'utf8', (err) =>{
      if (err) throw err;
      console.log('Note has been deleted')
    })
  }),
  res.status(200).end()
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
