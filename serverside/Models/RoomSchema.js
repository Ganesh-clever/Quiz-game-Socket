const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoomScheme = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    no_of_participate:{
        type:Number,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    slot_type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
    }
},{timestamps:true});

const Room = mongoose.model('rooms',RoomScheme);

module.exports = Room;