var $ = require('jQuery'), Backbone = require('backbone');

Backbone.$ = $;

var ratingDisplayTemplate = require('../../templates/rating-display-view.hbs');
var data = "Dummy data";
var RatingDisplayView = Backbone.View.extend(
    {
        el:$('#ratings-display'),
        initialize:function(){
            console.log("Yay ratings-display-view initialize");
        },

        render: function(data){
            this.$el.html(ratingDisplayTemplate({data:data}))}
    }
)

module.exports = RatingDisplayView;
