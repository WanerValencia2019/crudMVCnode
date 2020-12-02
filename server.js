const app = require("./index");



app.listen(app.get('port'), () => {
    console.info('Server running on 127.0.0.1:' + app.get('port'));
})


