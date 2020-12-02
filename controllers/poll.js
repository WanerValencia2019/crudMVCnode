const PollModel = require('./../models/index').PollModel;
const pollModel = new PollModel();
const { ObjectId } = require('mongodb');

class PollController {

    getAll(req, res) {
        pollModel.getAll((err, docs) => {
            //console.log(docs);
            if (err) {
                res.status(500).render('home', {
                    error: true,
                    messageError: "Failed to connect server"
                })
            } else {
                res.status(200).render('home', {
                    title: "OPERATIVE SYSTEM WAR",
                    data: docs
                })
            }
        })
    }

    getOne(req, res) {
        const { id } = req.params;
        pollModel.getOne(id, (err, doc) => {
            console.log(doc)
            if (err) res.status(303).redirect('/');
            res.status(200).render('editar', {
                data: doc,
            })
        });
    }

    save(req, res) {
        const { name, age, country, twitter, os, id } = req.body
        const data = {
            _id: (id || new ObjectId()),
            name: name,
            age: age,
            country,
            twitter: twitter,
            os: os,
        }
        if (id) data["_id"] = id;
        pollModel.save(data, (err, data) => {
            res.status(303).redirect('/');
            if (err) console.log(err);
        });

    }

    delete(req, res) {
        const { id } = req.body
        pollModel.delete(id, (err, data) => {
            res.status(303).redirect('/');
        })
    }

    drawForm(req, res) {
        res.status(200).render('create');
    }

}




module.exports = PollController;