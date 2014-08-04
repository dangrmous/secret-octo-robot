var Backbone = require('backbone'),
	Pub = require('../models/pub.js');

var Pubs = Backbone.Collection.extend({
    model: Pub,
    url: '/api/findbeer',
    comparator: 'pubName'
});

module.exports = Pubs;