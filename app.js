const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')
const app = express()
const port = 3000

// ejs use
app.set('view engine', 'ejs');

//bodyparser use
app.use(bodyParser.urlencoded({ extended: true }))

//static resources
app.use(express.static("public"))

//getDay and getDate from date custom module
var formattedDay = (date.getDate())

app.listen(port, (req, res) => {
  console.log("Server listening on port " + port)
})

var tasks = []
var workTasks = []

app.get("/", (req, res) => {
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('tasks.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_done BOOLEAN 
    );`);
  });
  db.all(`select * from tasks`, [], function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    tasks = [];
    rows.forEach((row) => {
      tasks.push(row.name);
    });
  });
  res.render("list.ejs", { listTitle: formattedDay, taskInput: tasks })
})

app.post('/delete', (req, res) => {
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('tasks.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the mydb database.');
  });
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_done BOOLEAN 
    );`);
  });
  let task = (req.body.item);
  db.run(`DELETE FROM tasks where name = ?`, [task], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) delete ${this.changes}`);
    res.redirect("/")
  });

})
app.post('/', (req, res) => {
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('tasks.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the mydb database.');
  });
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_done BOOLEAN 
    );`);
  });
  let task = (req.body.taskInput);
  db.run(`INSERT INTO tasks(name) VALUES(?)`, [task], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) inserted ${this.changes}`);
  });
  var whereDidTheRequestComeFrom = (req.body.list)
  if (whereDidTheRequestComeFrom === "Work") {
    workTasks.push(task)
    res.redirect("/work")
  } else {
    tasks.push(task)
    res.redirect("/")
  }
})

app.get("/work", (req, res) => {
  res.render("list.ejs", { listTitle: "Work", taskInput: workTasks })
})

app.post("/work", (req, res) => {
  let task = (req.body.taskInput)
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('tasks.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the mydb database.');
  });
  console.log('abdi');
  var whereDidTheRequestComeFrom = (req.body.list)
  if (whereDidTheRequestComeFrom === "Work") {
    workTasks.push(task)
    res.redirect("/work")
  } else {
    tasks.push(task)
    res.redirect("/")
  }

  res.redirect("/work")
})

app.get("/about", (req, res) => {
  res.render("about.ejs")
})