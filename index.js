let express = require('express');
let app = express();

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/actions', function (req, res) {
    res.render('home');
});
app.get('/actions/:type', function (req, res) {
    res.render('home');
});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});