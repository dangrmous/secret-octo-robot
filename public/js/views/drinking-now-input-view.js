var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var DrinkingInputView = Backbone.View.extend({

    el: '.form-group',
    events: {
        'click #add-beer': 'addBeer',
        'change :radio':
            function(){
                $('.choice').text( $('input:checked').val() + ' stars' );
            }

    },
    addBeer: function () {
        var $beerName = $(this.el).find('#beer-input');
        var $barName = $(this.el).find('#bar-input');
        var $beerRating = $(this.el).find('input:checked');

        var beerName = $beerName.val();
        var barName = $barName.val();
        var beerRating = $beerRating.val();
        var collectionFromInput = {
            beer: {
                name: beerName,
                creationDate: Date.now(),
                bars: [
                    {
                        barName: barName,
                        updated: Date.now()
                    }
                ],
                avgRating: beerRating,
                numEntries: (beerRating ? 1 : 0)

            }
        };

        this.collection.create(collectionFromInput, {validate: true});
        $beerName.val('');
        $barName.val('');
        $beerRating.each(function(){
            $(this).removeAttr('checked');
        });
        $('h4.choice').text('Rate this beer');
    }
});

module.exports = DrinkingInputView;