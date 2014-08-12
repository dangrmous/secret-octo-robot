var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

// Bring in pub list template
var pubListTemplate = require('../../templates/drinking-now-list.hbs');

var PubListView = Backbone.View.extend({
    tagName: 'div',
    className: 'table table-striped',
    initialize: function () {
        this.listenTo(this.collection,'all', this.render);
    },
    render: function () {

        var data = [];

        // Add pub and beer to list
        this.collection.models.forEach(function (pub) {
            data.push({pubName: pub.escape('pubName'), beerName: pub.escape('beerName') });
        });

        // Update pub table
        this.$el.html(pubListTemplate({pubData:data}));
    }
});

module.exports = PubListView;
