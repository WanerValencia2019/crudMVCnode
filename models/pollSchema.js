const mongoose = require('./configuration').mongoose;
const Schema = mongoose.Schema
const pollSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    country: String,
    twitter: String,
    os: { type: String, lowercase: true, requird: true }
}, {
    collection: "poll"
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;


//db.poll.save({
//    name: "Eduvicia Moreno Mosquera",
//    age: 68,
//    country: "Colombia",
//    twitter: "@eduMoreno",
//    os: "windows"
//})