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

app.get("/", (req, res)=>{
    const todayIndex = new Date()
    var dayToday = ""

    switch (new Date().getDay()) {
        case 0:
        dayToday = "Sunday";
          break;
        case 1:
        dayToday = "Monday";
          break;
        case 2:
        dayToday = "Tuesday";
          break;
        case 3:
        dayToday = "Wednesday";
          break;
        case 4:
        dayToday = "Thursday";
          break;
        case 5:
        dayToday = "Friday";
          break;
        case 6:
        dayToday = "Saturday";
      }

    var dayType = ""
    
    if(todayIndex==0 || todayIndex==6){
        dayType = "weekend"
    }else{
        dayType = "week day"
    }

    res.render('list.ejs', {dayToday: dayToday, dayType:dayType})
})