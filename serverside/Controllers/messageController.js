const Message = require("../Models/MessageSchema")

exports.GetMessageById = (req, res) => {
    try {
        const { senderId, receiverId } = req.query;
        Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort('timestamp').then((messages) => {
            res.status(200).json(messages);
        }).catch(() => {
            res.status(500).json({ Message: "Internal server issues." })
        });
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}