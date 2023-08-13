// Imports
const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

// Configs
env.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// DB connectivity
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
  console.log('DB connected successfully...');
}).catch((err)=>{
console.log('DB connected with some issues..');
})

// Api
const userRouter = require('./Routers/userRouter');
const RoomRouter = require('./Routers/RoomRouter');
const MessageRouter = require('./Routers/MessageRouter');

app.use('/api',userRouter);
app.use('/api',RoomRouter);
app.use('/api',MessageRouter);

const Server = app.listen(process.env.PORT,(()=>{
  console.log(`Server connected with port : ${process.env.PORT}`);
}));

// Socket Connection
const io = socketIo(Server,{cors: {origin: "*"}}); 
module.exports = io;
require('./Utils/SocketIo');