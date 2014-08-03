var $ = require('jquery'),
	Backbone = require('backbone');
	
Backbone.$ = $;

// Bring in template for main view
var findBeerTemplate = require('../../templates/find-beer.hbs');

var FindBeerTemplate = Backbone.View.extend({
	el: '#my-app',
	initialize: function () {
		console.log('Yay find beer view!');
		$(this.el).html(findBeerTemplate);
	},
	render: function () {
		// do something
		console.log('Yay find beer view render');
	}
});

module.exports = FindBeerTemplate;