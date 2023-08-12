const mongoose = require('mongoose');
const {Schema} = mongoose;

const SocketRoomScheme = new Schema({
    roomId:{
        type:String,
    },
    users:{
        type:[String],
    },
    questions:{
        type:[Object],
    },
    scores:{
        type:Object
    },
    userAttempt : {
        type:Number,
        default:0
    },
    slotType:{
        type:String
    },
    amount:{
        type:Number,
        default:0
    }
},{timestamps:true});

const SocketRoom = mongoose.model('socket_room',SocketRoomScheme);

module.exports = SocketRoom;