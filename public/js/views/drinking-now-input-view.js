var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var DrinkingInputView = Backbone.View.extend({

  el: '.form-group',
  events: {
    'click #add-pub': 'addPub'
  },
  addPub: function () {
    var $pubInput = $(this.el).find('#pub-input');
    var $beerName = $(this.el).find('#beer-input');

    var pubInput = $pubInput.val();
    var beerName = $beerName.val();
    var collectionFromInput = {
      pubName: pubInput,
      beerName: beerName,
      creationDate: Date.now()
    };
    this.collection.create( collectionFromInput, {validate: true});
    $beerName.val('');
    $pubInput.val('');
  }
});

module.exports = DrinkingInputView;