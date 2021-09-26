const mongoDB = require("mongoose")

const Schema = new mongoDB.Schema({
    Guild: String,
    RoleID: String
})

module.exports = mongoDB.model('muteroleid', Schema)