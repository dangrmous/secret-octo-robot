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

app.get('/api/findbeer', function (req, res) {
  var pubs = [];
  db.list('beerify-pubs')
  .then(function (result) {
    result.body.results.forEach(function (pub) {
      pubs.push(pub.value);
    });
    res.json(pubs);
    console.log(pubs);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.post('/api/findbeer', function (req, res) {
  req.accepts('application/json');
  console.log(req.body);
  db.put('beerify-pubs', ('pub' + req.body.creationDate), req.body)
  .then(function () {
    console.log(req.body);
    res.send(200,'ok, we added your pub, here is what you added on ' + req.body.creationDate + ': ' + req.body.pubName + ': ' + req.body.beerName);
  })
  .fail(function (err) {
    console.error(err);
  });
});

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
