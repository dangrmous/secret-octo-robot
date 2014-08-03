var $ = require('jquery'),
	Backbone = require('backbone');

Backbone.$ = $;

// Bring in template for main view
var drinkingNowTemplate = require('../../templates/drinking-now.hbs');

var DrinkingNowTemplate = Backbone.View.extend({
	el: '#my-app',
	initialize: function () {
		console.log('Yay drinking now view!');
		$(this.el).html(drinkingNowTemplate);
	},
	render: function () {
		// do something
		console.log('Yay drinking now view render');
	}
});

module.exports = DrinkingNowTemplate;