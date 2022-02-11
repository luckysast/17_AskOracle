const mongoose = require('mongoose'),
     UserModel = require('@AskOracleModels/user'),
     QuestModel = require('@AskOracleModels/quest');
const models = {
    User: mongoose.model('User'),
    Quest: mongoose.model('Quest')
}
module.exports = models;
