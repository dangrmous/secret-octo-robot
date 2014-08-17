var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

// Bring in pub list template
var barsListTemplate = require('../../templates/find-beer-list.hbs');

var BarsListView = Backbone.View.extend({
    tagName: 'div',
    className: 'table table-striped',
    initialize: function () {
        console.log("Yay BarsListView");
    },
    render: function (beerName) {
        console.log("Yay BarsListView render");
        var found = this.collection.filter(function(item){
            return(beerName == item.get('beer').name);
        });

        console.log("Found is: " + found);
        var data = found[0].attributes.bars;
        console.log("data is: " + data);

        this.$el.html(barsListTemplate({barData: data}));
    }
});

module.exports = BarsListView;