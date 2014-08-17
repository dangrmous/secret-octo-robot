var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

// Bring in beer list template
var beerListTemplate = require('../../templates/drinking-now-list.hbs');

var BeerListView = Backbone.View.extend({
  tagName: 'div',
  className: 'table table-striped',
  initialize: function () {
    this.listenTo(this.collection,'all', this.render);
  },
  render: function () {

    var data = [];

    // Add beer and bar to list
    this.collection.models.forEach(function (item) {
      var bars = item.attributes.beer.bars,
          barlist = [];

      // Add each bar in the bars array to barlist
      bars.forEach(function (bar) {
        barlist.push(bar);
      })

      data.push({
        beerName: item.attributes.beer.name,
        barName: barlist
      });
    });

    // Update table
    this.$el.html(beerListTemplate({ beerData: data }));
  }
});

module.exports = BeerListView;