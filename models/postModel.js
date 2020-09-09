const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const Posts = new Schema({
    //list of datas
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postMessage:{
        type:String,
        default:""
    },
    postImage:{
        type:String,
        default:""
    },
    postLikes:{
        type:Number,
        default:0
    },
    comment:{
        type:Array,
        default:[{}]
    },
    isVisible:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Posts', Posts);