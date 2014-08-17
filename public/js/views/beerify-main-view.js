var $ = require('jquery'),
	Backbone = require('backbone');

Backbone.$ = $;

// Bring in template for main view
var beerifyMainTemplate = require('../../templates/beerify-main.hbs');

var BeerifyMainView = Backbone.View.extend({
	el: '#my-app',
	initialize: function () {
		console.log('Yay main view!');
		$(this.el).html(beerifyMainTemplate);
	},
	render: function () {
		console.log('Yay main view render');
	}
});

module.exports = BeerifyMainView;