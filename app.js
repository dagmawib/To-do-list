const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// ejs use
app.set('view engine', 'ejs');

//bodyparser use
app.use(bodyParser.urlencoded({extended: true}))

//static resources
app.use(express.static("public"))

app.listen(port, (req, res)=>{
    console.log("Server listening on port "+port)
})

var tasks = ["Demo Task", "Demo Task"]

app.get("/", (req, res)=>{
  var today = new Date()

  var options = {
    weekday: 'long', 
    month: 'long',       
    day: 'numeric' 
  }

  var formattedDay = (today.toLocaleDateString("en-US", options))
  res.render("list.ejs", {htmldayplaceholder: formattedDay , taskInput: tasks})
})

app.post('/', (req, res)=>{
  taskInput = (req.body.taskInput)
  tasks.push(taskInput)
  res.redirect("/")
})