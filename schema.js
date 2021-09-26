const mongo = require('mongoose');

module.exports = mongo.model(
    'Money',
    new mongo.Schema({
        id: String,
        moni: Number,
        bank: Number,
    })
)