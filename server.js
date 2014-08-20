// Modules
var fs = require('fs'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    Handlebars = require('handlebars'),
    config = require('./config');

var db = require('orchestrate')(config.dbKey);

var beersCollection = "beerify-beers";
//var beersCollection = "beerify-beers-test";

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/server-templates');

var partials = "./server-templates/partials/";
fs.readdirSync(partials).forEach(function (file) {
    var source = fs.readFileSync(partials + file, "utf8"),
        partial = /(.+)\.html/.exec(file).pop();
    Handlebars.registerPartial(partial, source);
});

// express routes

app.get('/', function (req, res) {
    res.render('./index.html');
});

app.post('/api/beers', function (req, res) {
  req.accepts('application/json');
    console.log("req.body.creationDate is: " + req.body.beer.creationDate);
  db.put(beersCollection, ('beer' + req.body.beer.creationDate), req.body)
  .then(function () {
    console.log(req.body);
    res.send(200,'ok, we added your beer and pub, here is what you added on ' + req.body.creationDate + ': ' + req.body.pubName + ': ' + req.body.beerName);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.get('/api/beers', function (req, res) {
    var beers = [];
    db.list(beersCollection)
        .then(function (result) {
            result.body.results.forEach(function (beer){
                beers.push(beer.value);
            });
            console.log(beers);
            res.json(beers);
        })
        .fail(function (err) {
            console.error(err);
        });
});

app.put('/api/beers/:id', function(req, res){
    req.accepts('application/json');
    console.dir(req.body);
    var beerID = req.params.id;
    console.log("Beer ID is: " + beerID);
    console.log("Request body is: " + req.body);
    db.put(beersCollection, beerID, req.body)
        .then(function (result) {
            res.send(200,'ok, we updated your beer and pub, here is what you added on ' + req.body.creationDate + ': ' + req.body.pubName + ': ' + req.body.beerName);
        })
        .fail(function (err) {
            console.error(err);
        })
})


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 4444);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port # ' + app.get('port'));
});
