var $ = require('jquery'),
	Backbone = require('backbone');

Backbone.$ = $;

// Bring in input view
var DrinkInputView = require('./drinking-now-input-view');
var BeerListView = require('./drinking-now-list-view');

// Bring in template for main view
var drinkingNowTemplate = require('../../templates/drinking-now.hbs');

var Beers = require('../collections/beers');

var DrinkingNowTemplate = Backbone.View.extend({
	el: '#my-app',
	collection: new Beers(),
	initialize: function () {

		console.log('Yay drinking now view!');

		window.beerCollection = this.collection;
		this.collection.fetch();
		$(this.el).html(drinkingNowTemplate);
	},
	render: function () {
		
		console.log('Yay drinking now view render');

		var beerListView = new BeerListView({collection: this.collection});
    	beerListView.render();
    	$('#beer-list').html(beerListView.$el);

		var drinkInputView = new DrinkInputView({collection: this.collection});
	}
});

module.exports = DrinkingNowTemplate;