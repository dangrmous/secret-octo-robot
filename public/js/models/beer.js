var Backbone = require('backbone');

var Beer = Backbone.Model.extend({
    validate: function (attrs) {
        if (attrs.name.length < 1) {
            alert("No name entered for Beer");
            return "No name entered for Beer";
        }
    }
});

module.exports = Beer;

