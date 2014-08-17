var $ = require('jQuery'), Backbone = require('backbone');

Backbone.$ = $;

var ratingDisplayTemplate = require('../../templates/rating-display-view.hbs');
var RatingDisplayView = Backbone.View.extend(
    {
        el: '#rating-view-row',
        initialize:function(){
            console.log("Yay ratings-display-view initialize");
            $(this.el).html("<h2>OAHI/h2>");
        },

        render: function(data){
            var found = this.collection.filter(function(item){
                return(data == item.get('beer').name);
            });

            var rating = found[0].attributes.beer.avgRating;
            $(this.el).html(ratingDisplayTemplate({rating:rating}));
            console.log("Yay rating-display-view.js : render with data: " + rating);
        }

    }
)

module.exports = RatingDisplayView;
