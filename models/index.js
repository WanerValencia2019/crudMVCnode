const connection = require('./configuration').connection;

const PollModel = require('./poll');
const AuthModel = require('./auth');


module.exports = {
    connection,
    PollModel,
    AuthModel
}