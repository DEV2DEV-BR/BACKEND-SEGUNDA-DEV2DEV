const Message = require("../models/Messages");
const User = require("../models/Users");
const crypto = require('crypto')

class UserController {
    async sendMessage(req, res) {
        const { userId } = req.params;
        const { text, user_destination } = req.body

        if (user_destination === userId) {
            return res.status(400).json({ message: 'You can"t send a messege for you same' })
        }
        const message = await Message.create({
            text: text,
            user_id: userId,
            user_destination: user_destination
        })

        const formattedData = {
            id: message.id,
            text: message.text
        }

        const receiver = crypto.createHash('md5').update(`${user_destination}`).digest("hex");

        req.io.emit(`${receiver}`, 'messageTest')

        return res.status(200).json(formattedData);
    }

    async listAllMessages(req, res) {

        const messages = await Message.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'text'],
            include: [
                {
                    model: User, as: 'user',
                    attributes: ['name'],
                },
            ],
        });

        if (messages.length === 0) {
            return res.status(404).send({ message: "we don't have messages!" });
        }

        return res.status(200).json(messages);
    }
}

module.exports = new UserController();
