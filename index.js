let express = require('express');
const SettingsBill = require('./SettingsBill');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

let app = express();
const settingsBill = SettingsBill();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

//configure handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
//creating routs
app.get('/', function (req, res) {
    res.render('home', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals()
    });
});
app.post('/settings', function (req, res) {
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel

    })
    console.log();

    res.redirect('/');
});
app.post('/action', function (req, res) {

    //capture button type to add
    settingsBill.recordAction(req.body.billItemType)

    res.redirect('/');
});
app.get('/actions', function (req, res) {
    res.render("actions", {
        actions: settingsBill.actions()
    });
});
app.get('/actions/:billItemType', function (req, res) {
    const billItemType = req.params.billItemType;
    res.render("actions", {
        actions: settingsBill.actionsFor(billItemType)
    });
});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});