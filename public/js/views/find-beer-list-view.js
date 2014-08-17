var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

// Bring in pub list template
var barsListTemplate = require('../../templates/find-beer-list.hbs');
// Bring in rating-view template
var RatingDisplayView = require('./rating-display-view');

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

        var data = found[0].attributes.beer.bars;
        console.log("data is: " + data);
        this.$el.html(barsListTemplate({barData: data}));

        //Show the rating for the beer
        var ratingDisplayView = new RatingDisplayView({collection:this.collection});
        ratingDisplayView.render(beerName);
    }
});

module.exports = BarsListView;