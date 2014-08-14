var $ = require('jquery'),
	Backbone = require('backbone');

Backbone.$ = $;

// Bring in template for main view
var beerifyAboutTemplate = require('../../templates/about-us.hbs');

var BeerifyAboutView = Backbone.View.extend({
	el: '#my-app',
	initialize: function () {
		console.log('Yay about view!');
		$(this.el).html(beerifyAboutTemplate);
	},
	render: function () {
		// do something
		console.log('Yay about view render');
	}
});

module.exports = BeerifyAboutView;