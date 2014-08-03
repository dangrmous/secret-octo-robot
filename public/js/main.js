var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// Bring in view
var BeerifyMainView = require('./views/beerify-main-view'),
    DrinkingNowView = require('./views/drinking-now-view'),
    FindBeerView = require('./views/find-beer-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main',
    'drinkingnow': 'drinkingnow',
    'findbeer': 'findbeer'
  },
  main: function () {
    this.beerifyMainView = new BeerifyMainView();
    this.beerifyMainView.render();
  },
  drinkingnow: function () {
    this.drinkingNowView = new DrinkingNowView();
    this.drinkingNowView.render();    
  },
  findbeer: function () {
    this.findBeerView = new FindBeerView();
    this.findBeerView.render();    
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});