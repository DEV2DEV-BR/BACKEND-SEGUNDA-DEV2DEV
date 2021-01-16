const User = require("../models/Users");

class UserController {
    async insert(req, res) {
        const user = await User.create(req.body)

        const formattedData = {
            id: user.id,
            name: user.name
        }

        return res.status(200).json(formattedData);
    }

    async getUser(req, res) {

        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        const formattedData = {
            id: user.id,
            name: user.name
        }

        return res.status(200).json(formattedData);
    }
}

module.exports = new UserController();
