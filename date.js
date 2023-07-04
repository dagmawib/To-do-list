exports.getDate = function getDate(){
    var today = new Date()

    var options = {
    weekday: 'long', 
    month: 'long',       
    day: 'numeric' 
    }

    var formattedDay = (today.toLocaleDateString("en-US", options))
    return formattedDay
}

exports.getDay = function getDay(){
    var today = new Date()

    var options = {
    weekday: 'long', 
    }

    var formattedDay = (today.toLocaleDateString("en-US", options))
    return formattedDay
}