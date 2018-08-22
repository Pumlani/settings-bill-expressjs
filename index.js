// importing modules
const express = require('express');
const SettingsBill = require('./SettingsBill');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var moment = require('moment');
const app = express();

// factory instance
const settingsBill = SettingsBill();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// configure handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        'time': function () {
            return moment(this.time).fromNow();
        }

    }
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
// GET routes
app.get('/', function (req, res) {
    res.render('home', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        color: settingsBill.colorChange()
    });
});
app.get('/actions', function (req, res) {
    res.render('actions', {
        actions: settingsBill.actions()
    });
});
app.get('/actions/:billItemType', function (req, res) {
    const billItemType = req.params.billItemType;
    res.render('actions', {
        actions: settingsBill.actionsFor(billItemType)
    });
});
// POST routes
app.post('/resets', function (req, res) {
    let reset = {
        resetB: settingsBill.reset()
    };
    res.render('home', {
        reset
    });
});
app.post('/settings', function (req, res) {
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    res.redirect('/');
});
app.post('/action', function (req, res) {
    // capture button type to add
    settingsBill.recordAction(req.body.billItemType);
    res.redirect('/');
});

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
