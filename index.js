const express = require('express');
const app = express();
const mysql = require('mysql');
const logger = require('morgan');
const myConnection = require('express-myconnection');
const favicon = require('serve-favicon')(__dirname + "/public/favicon.ico");

const dbOptions = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "os_war"
};
const port = (process.env.PORT || 8080);
const staticDIR = express.static(__dirname + "/public");
const viewsDIR = __dirname + "/views";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(myConnection(mysql, dbOptions, 'request'));

app.use('/static', staticDIR);
app.use(favicon);
app.set('views', viewsDIR);
app.set('view engine', 'pug');
app.set('port', port);


app.get('/', (req, res) => {
    req.getConnection((err, conect) => {
        if (err) {
            res.status(500).render('home', {
                error: true,
                messageError: "Failed to connect server"
            })
        } else {
            conect.query('SELECT * FROM poll', [], (err, data) => {
                console.table(data);
                res.status(200).render('home', {
                    title: "OPERATIVE SYSTEM WAR",
                    data: data
                })
            })
        }
    })
})

app.post('/eliminar', (req, res)=> {
    const id = Number(req.body.id);

    req.getConnection((err, conn) => {
        if (err) {
            res.status(303).redirect('/');
        }
        conn.query("DELETE FROM poll where id=?",[id],(err,data)=>{
            res.status(303).redirect('/');
            console.table(data);
        })
    })
})

app.get('/crear', (req,res)=>{
    res.status(200).render('create')
})

app.post('/crear', (req, res)=>{
    const { name,age,country,twitter,os } = req.body
    console.table(req.body)
    req.getConnection((error,conn)=>{
        conn.query("INSERT INTO poll (id,name,age,country,twitter,os) VALUES(?,?,?,?,?,?)",
            [0,name,age,country,twitter,os],(err,data)=>{
              if (err) res.status(303).redirect('/crear');
              res.status(303).redirect('/')
            })
    })
})

app.get('/editar/:id', (req, res)=>{
    const { id } = req.params;
    console.table(req.params)
    req.getConnection((err,conn)=>{
        if (err) res.status(303).redirect('/');
        conn.query("SELECT * FROM poll WHERE id=?",[id],(err,data)=>{
            if (err) res.status(303).redirect('/');
            console.table(data[0])
            res.status(200).render('editar',{
                data: data[0],
            })
        })
    })

})

app.post('/editar', (req, res)=> {
    const { name,age,country,twitter,os, id } = req.body
    const data = {
        name: name,
        age: age,
        country,
        twitter: twitter,
        os: os,
    }
    console.table(req.body)
    req.getConnection((error,conn)=>{
        conn.query("UPDATE poll SET ? WHERE id=?",[data,id],(err,data)=>{
              if (err) res.status(303).redirect('/editar/'+id);
              res.status(303).redirect('/');
        })
    })

})




app.listen(app.get('port'), () => {
    console.info('Server running on 127.0.0.1:' + app.get('port'));
})