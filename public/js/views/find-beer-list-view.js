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
        function timeSince(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        }
        var found = this.collection.filter(function(item){
            return(beerName == item.get('beer').name);
        });

        var barData = found[0].attributes.beer.bars;
        barData.forEach(function(bar, index, bars){
            var timeSinceString = timeSince(bar.updated);
            bars[index].timeSinceString = timeSinceString;

        });
        console.log("data is: " + barData);
        this.$el.html(barsListTemplate({barData: barData}));

        //Show the rating for the beer
        var ratingDisplayView = new RatingDisplayView({collection:this.collection});
        ratingDisplayView.render(beerName);
    }
});

module.exports = BarsListView;