const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Message extends Model {
    static init(sequelize) {
        super.init(
            {
                text: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }


    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Message;