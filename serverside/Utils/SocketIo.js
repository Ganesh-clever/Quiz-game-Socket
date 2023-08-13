const SocketRoom = require("../Models/SocketRoom");
const User = require('../Models/userSchema');
const Message = require('../Models/MessageSchema');
const io = require("../server");
const { questions } = require("./Constants");
const { shuffleArray, calculateScores } = require("./GlobalFunctions");

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('createRoom', async (roomId,slotType,amount) => {
        SocketRoom.create({ roomId, users: [], questions: [], scores: {}, slotType, amount });
        socket.join(roomId);
        socket.emit('roomCreated', roomId);
    });

    socket.on('joinRoom', async (roomId) => {
        await SocketRoom.findOne({ roomId:roomId }).then(async(room)=>{
            if(room.slotType !== 'paid'){
                let status = 200;
                room.users.push(socket.id);
                await room.save();
                socket.join(roomId);
                socket.emit('roomJoined', roomId,status,"You successfully join the room...");
            }else{
                let status = 500
                socket.emit('roomJoined', roomId,status,"you can't able to join paid room.");
            }
        }).then((err)=>{

        });
    });

    socket.on('startGame', (roomId) => {
        SocketRoom.findOne({ roomId: roomId }).then((room) => {
          if (!room) {
            socket.emit('Start', 'room not available.');
          }
          const expectedVersion = room.__v; 
          const newQuestions = shuffleArray(questions).slice(0, 5);
          if(room.questions.length > 0){
            io.to(roomId).emit('gameStarted', room.questions);
          }else{
            SocketRoom.findOneAndUpdate(
                { roomId: roomId, __v: expectedVersion }, 
                { questions: newQuestions }, 
                { new: true } 
              ).then((updatedRoom) => {
                if (updatedRoom) {
                  io.to(roomId).emit('gameStarted', newQuestions);
                } 
              });
          }
        })
      });
      
      socket.on('submitAnswers', async (roomId, userAnswers) => {
            const room = await SocketRoom.findOne({ roomId });
            if (room) {
            room.userAttempt = room.userAttempt + 1;
            await room.save();
              const scores = calculateScores(room.questions, userAnswers, socket.id);
              io.to(roomId).emit('scoresUpdated', scores, socket.id);
              if (room.userAttempt == 2) {
                await SocketRoom.deleteOne({ roomId }); 
              }
            }
      });

      socket.on('send-message',async(fromUserId,toUserId,message)=>{
         await User.find({$and:[{_id:fromUserId},{_id:toUserId}]}).then((user)=>{
          if(user){
            Message.create({senderId:fromUserId,receiverId:toUserId,message:message});
            socket.broadcast.emit('chat-response',{senderId:fromUserId,receiverId:toUserId,message:message});
            socket.emit('my-message',{senderId:fromUserId,receiverId:toUserId,message:message});
          }else{
            let status = 200;
            socket.emit('message-status','User not found',status);
          }
         })
      });
});