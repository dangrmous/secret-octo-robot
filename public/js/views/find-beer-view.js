var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Beers = require('../collections/beers');
var data = [];

// Bring in template for main view
var findBeerTemplate = require('../../templates/find-beer.hbs');

var FindBeerView = Backbone.View.extend({
    el: '#my-app',
    collection: new Beers(),

    initialize: function () {
        //var data = [];
        this.listenTo(this.collection,'sync', this.render);
        this.collection.fetch({
            success: function (model, response, options) {
                console.log("collection fetch success!");
                model.forEach(
                    function(item){
                        data.push({name:item.attributes.name});
                    });
                //console.log(data);

            },
            error: function () {
                console.log("collection fetch error!");
            }
        });
        console.log('Yay find beer view!');
        //$(this.el).html(findBeerTemplate);
        //console.dir(this.collection);
    },
    render: function () {
        // do something
        $(this.el).html(findBeerTemplate({beers:data}));
        console.log('Yay find beer view render');


    }
});

module.exports = FindBeerView;