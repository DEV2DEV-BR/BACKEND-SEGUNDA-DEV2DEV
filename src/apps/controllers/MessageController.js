const Message = require("../models/Messages");
const User = require("../models/Users");

class UserController {
    async sendMessage(req, res) {
        const { userId } = req.params;
        const { text } = req.body
        console.log(userId, 'USER ID')
        const message = await Message.create({
            text: text,
            user_id: userId
        })

        const formattedData = {
            id: message.id,
            text: message.text
        }

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
