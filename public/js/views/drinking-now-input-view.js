var $ = require('jquery'),
    Backbone = require('backbone'),
    Beers = require('../collections/beers'),
    drinkingNowTemplate = require('../../templates/drinking-now.hbs'),
    newBeer = false;

Backbone.$ = $;

var DrinkingInputView = Backbone.View.extend({


    el: '.form-group',
    events: {
        'click #add-beer': 'addBeer',
        'click #add-beer-btn': 'addNewBeer',
        'click #go-back': 'goBackToList',
        'change :radio': function () {
            $('.choice').text($('input:checked').val() + ' stars');

        }
    },
    collection: new Beers(),
    initialize: function () {
        this.listenTo(this.collection, 'all', this.render);
    },
    render: function () {

        var newBeerInput = $('#add-new-beer'),
            goBackBtn = $('#go-back'),
            data = [];

        newBeerInput.hide();
        goBackBtn.hide();


        // Add beer and bar to list
        this.collection.models.forEach(function (item) {
            console.log('ITEM' + item.attributes.beer);
            data.push({
                name: item.attributes.beer.name
            });
        });

        // Update table
        if (!newBeer) {
            this.$('#beer-input').html(drinkingNowTemplate({ beerData: data }));
        } else {
            newBeerInput.html(drinkingNowTemplate({ beerData: data }));
        }
    },
    addBeer: function () {
        var $beerName;

        if (!newBeer) {
            $beerName = $(this.el).find('#beer-input');
        } else {
            $beerName = $(this.el).find('#add-new-beer');
        }
        var $barName = $(this.el).find('#bar-input'),
            $beerRating = $(this.el).find('input:checked'),
            beerName = $beerName.val(),
            barName = $barName.val(),
            beerRating = $beerRating.val(),
            collectionFromInput = {

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
        $beerRating.each(function () {
            $(this).removeAttr('checked');
        });
        $('h4.choice').text('Rate this beer');
        if ($('input#postToFacebook:checked')) {
            var fbPost = {};
            fbPost.message = 'I\'m drinking ' + $beerName.val() + " at " + $barName.val();
            console.log("FB checked");
            FB.login(function () {
                //fbPost = {"message":"BLAH"};
                FB.api('/v2.1/me/feed', 'post', {message: "Hello world"}, function (response) {
                    if (!response || response.error) {
                        console.dir(fbPost);
                        console.log(response.error);

                    } else {
                        console.log('Post ID: ' + response.id);

                    }

                }, {scope: 'publish_actions'})


            })
        }

        if (newBeer) {
            $('#add-new-beer').hide();
            $('#beer-input').show();
            newBeer = false;
        }
    },
    addNewBeer: function () {
        var beerList = $('#beer-input'),
            newBeerInput = $('#add-new-beer'),
            goBackBtn = $('#go-back'),
            addBeerBtn = $('#add-beer-btn');

        newBeer = true;

        addBeerBtn.hide();
        beerList.hide();
        newBeerInput.show();
        goBackBtn.show();
    },
    goBackToList: function () {
        var beerList = $('#beer-input'),
            newBeerInput = $('#add-new-beer'),
            goBackBtn = $('#go-back'),
            addBeerBtn = $('#add-beer-btn');

        newBeer = false;

        addBeerBtn.show();
        beerList.show();
        newBeerInput.hide();
        goBackBtn.hide();
    },
    initialize: function () {
        $.getScript('http://connect.facebook.net/en_US/sdk.js', function () {

            FB.init({
                appId: '797631293615162',

                version: 'v2.1'
            })

        });

    }
});


module.exports = DrinkingInputView;