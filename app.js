const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// ejs use
app.set('view engine', 'ejs');

//bodyparser use
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, (req, res)=>{
    console.log("Server listening on port "+port)
})

var items = []

app.get("/", (req, res)=>{
    const today = new Date()

    var options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric' 
    }

    var formattedDay = (today.toLocaleDateString("en-US", options))

    res.render("list.ejs", {htmldayplaceholder: formattedDay, newListItem: items})

})

app.post('/', (req, res)=>{
  var item = (req.body.taskInput)
  items.push(item)
  res.redirect("/")
})