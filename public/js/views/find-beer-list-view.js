var $ = require('jquery'),
    Backbone = require('backbone'),
    Moment = require('moment');

Backbone.$ = $;

// Bring in pub list template
var barsListTemplate = require('../../templates/find-beer-list.hbs');
// Bring in rating-view template
var RatingDisplayView = require('./rating-display-view');

var BarsListView = Backbone.View.extend({
    tagName: 'div',
    className: 'table table-striped',
    initialize: function () {
        console.log('Yay BarsListView');
    },
    render: function (beerName) {
        console.log('Yay BarsListView render');
        var found = this.collection.filter(function(item){
            return(beerName == item.get('beer').name);
        });

        var barData = found[0].attributes.beer.bars;
        barData.forEach(function(bar, index, bars){
            bars[index].timeSinceString = Moment(bar.updated).fromNow();
        });
        console.log('data is: ' + barData);
        this.$el.html(barsListTemplate({barData: barData}));

        //Show the rating for the beer
        var ratingDisplayView = new RatingDisplayView({collection:this.collection});
        ratingDisplayView.render(beerName);
    }
});

module.exports = BarsListView;