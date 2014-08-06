var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Beers = require('../collections/beers');

// Bring in template for main view
var findBeerTemplate = require('../../templates/find-beer.hbs');

var FindBeerView = Backbone.View.extend({
    el: '#my-app',
    collection: new Beers(),
    initialize: function () {

        console.log('Yay find beer view!');
        //$(this.el).html(findBeerTemplate);
        //console.dir(this.collection);
    },
    render: function () {
        // do something
        console.log('Yay find beer view render');
        var data = [];
        this.collection.fetch({
            success: function (model, response, options) {
                console.log("collection fetch success!");
                model.forEach(
                    function(item){
                        data.push({name:item.attributes.name});
                    });
                console.log(data);
                console.log(this.$el);
            },
            error: function () {
                console.log("collection fetch error!");
            }
        });
        $(this.el).html(findBeerTemplate({beers:data}));

    }
});

module.exports = FindBeerView;