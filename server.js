var express = require('express');

var bodyParser = require('body-parser');


var port = 3000;

var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
    })

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.listen(port, function() {
    console.log('Server started on port ' + port);
})
