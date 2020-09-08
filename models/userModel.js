const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const User = new Schema({
    //list of datas
    username: {
        type: String,
        unique:true,
        required: [true, 'Please Fill-up the blank field']
    },
    password: {
        type: String,
        minlength:8,
        required: [true, 'This Field is required']
    },
    firstName:{
        type:String,
        required:[true, 'This Field is required']
    },
    lastName:{
        type:String,
        required:[true, 'This Field is required']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    address:{
        type:String,
        required:[true,'Please put your present address']
    },
    emailAddress:{
        type:String,
        required:[true,'Please put your active Email Address']
    },
    phoneNumber:{
        type:String,
        required:[true,'please enter your active contact number'],
        minlength:11
    },
    birthDay:{
        type:Date,
        required:[true,'Please enter you date of birth']
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
   profilePicture:{
       type:String,
       default:''
   },
   bio:{
    type:String,
    default:''
   },
   createdAt:{
       type:Date,
       default:Date.now()
   },
   updatedAt:{
       type:Date,
       default:Date.now(),
   },
   isBlocked:{
       type:Boolean,
       default:false
   }
});

module.exports = mongoose.model('User', User);