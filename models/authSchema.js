const mongoose = require('../../mongoMVC/models/configuration').mongoose;
const Schema = mongoose.Schema
const authSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
}, {
    collection: "users"
});

const Auth = mongoose.model('Users', authSchema);

module.exports = Auth;