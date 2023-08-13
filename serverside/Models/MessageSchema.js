const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        },
    message: {
        type: String,
        require:true
    }
  },{timestamps:true});

const Message = mongoose.model('messages',chatSchema);

module.exports = Message;