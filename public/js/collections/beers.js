var Backbone = require('backbone');
var Beer = require('../models/beer.js');

var Todos = Backbone.Collection.extend({
    model: Beer,
    url: '/api/beers',
    comparator: 'creationDate'
});

module.exports = Todos;