var $ = require('jquery'),
	Backbone = require('backbone');

Backbone.$ = $;

// Bring in input view
var DrinkInputView = require('./drinking-now-input-view');
var PubListView = require('./drinking-now-list-view');

// Bring in template for main view
var drinkingNowTemplate = require('../../templates/drinking-now.hbs');

// Bring in pubs collection
var Pubs = require('../collections/pubs');

var DrinkingNowTemplate = Backbone.View.extend({
	el: '#my-app',
	collection: new Pubs(),
	initialize: function () {
		window.pubCollection = this.collection;
		this.collection.fetch();

		console.log('Yay drinking now view!');
		$(this.el).html(drinkingNowTemplate);
	},
	render: function () {
		// do something
		console.log('Yay drinking now view render');

		var pubListView = new PubListView({collection: this.collection});
    	pubListView.render();
    	$('#pub-list').html(pubListView.$el);

		var drinkInputView = new DrinkInputView({collection: this.collection});
	}
});

module.exports = DrinkingNowTemplate;