const mongoose = require('mongoose');
const { user, database, host, password, port } = require('./db-options').mongodb;

const urlMongo = `mongodb://${user}:${password}@${host}:${port}/${database}`;
const url = `mongodb://${host}:${port}/${database}`;


mongoose.connect(url, (err) => {
    if (err) return console.log("Error conect mongodb " + err.stack);
    return console.log("successfully conected  mongodb ");
}, { useUnifiedTopology: true })

module.exports = { mongoose };