const Auth = require('./authSchema');


class AuthModel {
    getUser({ username, password }, callback) {
        Auth.findOne({ username: username, password: password }).exec((err, doc) => {
            if (err) throw err;
            callback(doc);
        });
    }

    setUser(data, callback) {
        console.table(data);
        const new_user = Auth({
            _id: data._id,
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        })
        new_user.save(callback)
    }
}



module.exports = AuthModel;