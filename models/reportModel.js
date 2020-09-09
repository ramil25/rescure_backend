const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF REPORT
const Report = new Schema({
//all dats needs
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
reportTitle:{
    type:String,
    required:[true,"Please provide the title of the report"]
},
reportDescription:{
    type:String,
    minlength:10,
    required:[true,"Please provide a report description"]
},
dateTimeReported:{
    type:Date,
    required:[true,"provide a valid date"]
},
reportLocation:{
    type:String,
    minlength:10,
    required:[true,"put the location"]
},
image:{
    type:String,
    required:[true,"Please provide image for your report"]
},
reportStatus:{
    type:String,
    enum:["pending","approve","solve"],
    default:"pending"
},
createdAt:{
    type:Date,
    default:Date.now()
},
updatedAt:{
    type:Date,
    default:Date.now()
}
})

module.exports = mongoose.model('Report', Report);