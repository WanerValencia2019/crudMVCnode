'use strict';

const Poll = require('./pollSchema');


class PollModel {
    getAll(callback) {
        Poll.find().exec(callback);
    }

    getOne(id, callback) {
        Poll.findOne({ _id: id }).exec(callback);
    }

    save(data, callback) {
        Poll.exists({ _id: data._id }, (err, value) => {
            if (value) {
                Poll.update({ _id: data._id }, { $set: data }, callback);
            } else {
                const new_poll = new Poll(data);
                new_poll.save(callback);
            }

        });
    }

    delete(id, callback) {
        Poll.deleteOne({ _id: id }).exec(callback)
    }

}




module.exports = PollModel;