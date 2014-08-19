var $ = require('jQuery'), Backbone = require('backbone');

Backbone.$ = $;

var ratingDisplayTemplate = require('../../templates/rating-display-view.hbs');
var RatingDisplayView = Backbone.View.extend(
    {
        el: '#rating-view-row',
        initialize:function(){
            console.log("Yay ratings-display-view initialize");
        },

        render: function(data){
            var found = this.collection.filter(function(item){
                return(data == item.get('beer').name);
            });

            var rating = found[0].attributes.beer.avgRating;
            $(this.el).html(ratingDisplayTemplate({rating:rating}));
            for (i = 0; i < rating; i++){
                $('#stars-area').append('<img class="one-star" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=">');
            }
        }

    }
)

module.exports = RatingDisplayView;
