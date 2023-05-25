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
    const today = new Date()

    var options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric' 
    }

    var formattedDay = (today.toLocaleDateString("en-US", options))

    res.render("list.ejs", {htmldayplaceholder: formattedDay})




    var dayType = ""
    
    // if(todayIndex==0 || todayIndex==6){
    //     dayType = "weekend"
    // }else{
    //     dayType = "week day"
    // }


    // render the ejs file in the views directory
    // res.render('list.ejs', {dayToday: today.weekday, dayType:dayType})
})