var Backbone = require('backbone');
var Beer = require('../models/beers.js');

var Todos = Backbone.Collection.extend({
    model: Beer,
    url: '/api/todos',
    comparator: 'creationDate'
});

module.exports = Todos;