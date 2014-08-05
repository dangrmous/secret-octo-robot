var Backbone = require('backbone');

var Pub = Backbone.Model.extend({
	validate: function (attrs) {
		if (attrs.pubName.length < 1) {
			alert("No name entered for Pub");
			return "No name entered for Pub";
		}
	}
});

module.exports = Pub;