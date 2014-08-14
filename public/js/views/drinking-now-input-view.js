var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var DrinkingInputView = Backbone.View.extend({

  el: '.form-group',
  events: {
    'click #add-beer': 'addBeer'
  },
  addBeer: function () {
    var $beerName = $(this.el).find('#beer-input');
    var $barName = $(this.el).find('#bar-input');

    var beerName = $beerName.val();
    var barName = $barName.val();
    var collectionFromInput = {
      beer: {
        name: beerName,
        creationDate: Date.now(),
        bars: [{
          barName: barName
        }]
      }
    };

    this.collection.create( collectionFromInput, {validate: true} );
    $beerName.val('');
    $barName.val('');
  }
});

module.exports = DrinkingInputView;