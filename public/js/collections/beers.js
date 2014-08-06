var Backbone = require('backbone');
var Beer = require('../models/beer.js');

var Beers = Backbone.Collection.extend({
    model: Beer,
    url: '/api/beers'
});

module.exports = Beers;