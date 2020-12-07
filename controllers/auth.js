const AuthModel = require('./../models/index').AuthModel;
const authModel = new AuthModel();


const auth = {
    logueado: false,
    username: null,
    firstName: null,
    lastName: null
}

class AuthController {

    loginRequired(req, res, next) {
        if (req.session.hasOwnProperty('auth')) {
            if (req.session.auth.username) {
                next();

            } else {
                res.status(200).render("login");
            }
        } else {
            req.session['auth'] = auth;
            res.status(200).render("login");
        }
    }
    verifyLogin(req, res, next) {
        //console.log(req.session.auth)
        if (req.session.hasOwnProperty('auth')) {
            if (req.session.auth.username) {
                res.status(303).redirect("/");
            } else {
                next();
            }
        } else {
            req.session['auth'] = auth;
            res.status(200).render("login");
        }
    }
    drawLogin(req, res, next) {
        console.log(req.session)
        if (req.session.hasOwnProperty('auth')) {
            if (req.session.auth.username && req.session.auth.logueado) {
                res.status(303).redirect("/");
            } else {
                res.status(200).render("login");
            }
        } else {
            console.log(req.session)
            req.session['auth'] = auth;
            res.status(200).render("login");
        }

    }
    drawRegister(req, res) {
        res.status(200).render('register');
    }

    login(req, res) {
        const { username, password } = req.body;
        console.log("ENTRA A LOGIIN");
        authModel.getUser({ username, password }, (doc) => {
            console.log("Entra");
            if (doc) {
                console.log("LOGUEADO");
                const auth = {
                    logueado: true,
                    username: doc.username,
                    firstName: doc.firstName,
                    lastName: doc.lastName
                }
                req.session['auth'] = auth;
                res.status(303).redirect("/");
            } else {
                req.session['auth'] = auth;
                console.log("Datos incorrectos");
                res.status(303).redirect("/login");
            }
        })
    }
    register(req, res, next) {
        const { firstName, lastName, username, password } = req.body;
        const data = {
            _id: null,
            firstName: (firstName || ""),
            lastName: (lastName || ""),
            username: username,
            password: password
        }
        authModel.setUser(data, (err, doc) => {
            if (err) throw err;
            console.log(doc);
            res.status(303).redirect('/login');
        })
    }
    logout(req, res) {
        req.session['auth'] = auth;
        console.log(req.session);
        res.status(303).redirect("/login");
    }

}


module.exports = AuthController;