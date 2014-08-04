var Backbone = require('backbone'),
	Pub = require('../models/pub.js');

var Pubs = Backbone.Collection.extend({
    model: Pub,
    url: '/api/pubs',
    comparator: 'name'
});

module.exports = Pubs;