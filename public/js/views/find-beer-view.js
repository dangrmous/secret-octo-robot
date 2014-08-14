var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Beers = require('../collections/beers');
var data = [];

// Bring in template for main view
var findBeerTemplate = require('../../templates/find-beer.hbs');

//Bring in list view

var BarsListView = require('./find-beer-list-view');

var FindBeerView = Backbone.View.extend({
    el: '#my-app',
    collection: new Beers(),
    initialize: function () {
        window.beerCollection = this.collection;
        data = [];
        this.listenTo(this.collection, 'sync', this.render);
        this.collection.fetch({
            success: function (model, response, options) {
                console.log("collection fetch success!");
                model.forEach(
                    function (item) {
                        data.push({name: item.attributes.beer.name});
                    });

            },
            error: function () {
                console.log("collection fetch error!");
            }
        });
        console.log('Yay find beer view!');

    },
    render: function () {

        $(this.el).html(findBeerTemplate({beers: data}));
        console.log('Yay find beer view render');


    },
    events: {"click #get-bars": function () {
        console.log("#get-bars clicked!");
        var barsListView = new BarsListView({collection: this.collection});
        barsListView.render($('#beer-select').val());
        $('#pub-list-row').html(barsListView.$el);
    }
    }
});

module.exports = FindBeerView;