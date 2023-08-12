const Room = require("../Models/RoomSchema");
const SocketRoom = require("../Models/SocketRoom");

exports.CreateRoom = (req, res) => {
    try {
        const { name, no_of_participate, start_date, end_date, slot_type, amount } = req.body;
        Room.create({
            name: name,
            no_of_participate: no_of_participate,
            start_date: start_date,
            end_date: end_date,
            slot_type: slot_type,
            amount: amount
        }).then(() => {
            res.status(201).json({ Message: "Room created successfully." })
        }).catch(() => {
            res.status(500).json({ Message: "Internal server issues." })
        })
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}

exports.GetRoom = (req, res) => {
    try {
        Room.find().then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(500).json({ Message: "Internal server issues." })
        })
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}

exports.GetByIdRoom = (req, res) => {
    try {
        const { roomId } = req.params;
        console.log(roomId);
        Room.findById({ _id: roomId }).then((data) => {
            res.status(200).json(data)
        }).catch(() => {
            res.status(500).json({ Message: "Internal server issues." })
        })
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}

exports.UpdateRoom = (req, res) => {
    try {
        const { roomId } = req.params;
        const { name, no_of_participate, start_date, end_date, slot_type, amount } = req.body;
        Room.findByIdAndUpdate({ _id: roomId }, {
            $set: {
                name: name,
                no_of_participate: no_of_participate,
                start_date: start_date,
                end_date: end_date,
                slot_type: slot_type,
                amount: amount
            }
        }).then((data) => {
            res.status(201).json({ Message: "Room updated successfully." })
        }).catch(() => {
            res.status(500).json({ Message: "Internal server issues." })
        })
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}

exports.DeleteRoom = (req, res) => {
    try {
        const { roomId } = req.params;
        Room.deleteOne({ _id: roomId }).then(() => {
            res.status(200).json({ Message: 'Room deleted successfully.' })
        }).catch(() => {
            res.status(500).json({ Message: "Internal server issues." })
        })
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}

exports.GetAllQuizRoom = (req,res) => {
    try{
        SocketRoom.find().sort({createdAt:-1}).then((data)=>{
           res.status(200).json({data});
        }).catch(()=>{
            res.status(500).json({ Message: "Internal server issues." })
        })
    }catch(err){
        res.status(500).json({ Message: "Internal server issues." })
    }
}