var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Beers = require('../collections/beers');
var data = [];

// Bring in template for main view
var findBeerTemplate = require('../../templates/find-beer.hbs');

//Bring in list view

var BarsListView = require('./find-beer-list-view');
var RatingDisplayView = require('./rating-display-view')

var FindBeerView = Backbone.View.extend({
    el: '#my-app',
    collection: new Beers(),
    initialize: function () {
        data = [];
        this.listenTo(this.collection,'sync', this.render);
        this.collection.fetch({
            success: function (model, response, options) {
                console.log("collection fetch success!");
                model.forEach(
                    function(item){
                        data.push({name:item.attributes.beer.name});

                    });

            },
            error: function () {
                console.log("collection fetch error!");
            }
        });
        console.log('Yay find beer view!');
    },
    render: function () {
        // do something
        $(this.el).html(findBeerTemplate({beers:data}));
        console.log('Yay find beer view render');


    },
    events: {"click #get-bars" : function(){
        console.log("#get-bars clicked!");
        var selectedBeer = $('#beer-select').val();
        var ratingDisplayView = new RatingDisplayView({collection:this.collection});
        ratingDisplayView.render(selectedBeer);
        var barsListView = new BarsListView({collection:this.collection});
        barsListView.render(selectedBeer);
        $('#pub-list-row').html(barsListView.$el);
    }
    }
});

module.exports = FindBeerView;