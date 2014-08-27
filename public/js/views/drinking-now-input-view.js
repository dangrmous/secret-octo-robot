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
        'change :radio':
            function(){
                $('.choice').text( $('input:checked').val() + ' stars' );
            }
    },
    collection: new Beers(),
    initialize: function () {
        this.listenTo(this.collection,'all', this.render);
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
                    avgRating: (beerRating || 0),
                    numEntries: (beerRating ? 1 : 0)
                }
        };

        var beerSearch = this.collection.find(function(item){
            return(item.get('beer').name == beerName);
        });

        if (beerSearch) {
            collectionFromInput = beerSearch;
            var tempBeer = collectionFromInput.get('beer');
            tempBeer.bars.push({barName: barName, updated: Date.now()});
            if (beerRating) {
                tempBeer.numEntries++;
                tempBeer.avgRating = parseInt(tempBeer.avgRating);
                beerRating = parseInt(beerRating);
                tempBeer.avgRating = ((tempBeer.avgRating + beerRating) / tempBeer.numEntries);
            }
            collectionFromInput.set({beer: tempBeer});
        }

        this.collection.create(collectionFromInput, {validate: true});
        $beerName.val('');
        $barName.val('');
        $beerRating.each(function(){
            $(this).removeAttr('checked');
        });
        $('h4.choice').text('Rate this beer');

        if (newBeer) {
            $('#add-new-beer').hide();
            $('#beer-input').show();
            $('#add-beer-btn').show();
            newBeer = false;
        }

        if ($("input[name='postToFacebook']").is(':checked')) {
            $.getScript('http://connect.facebook.net/en_US/sdk.js', function () {

                FB.init({
                    appId: '797631293615162',
                    version: 'v2.1'
                });

                FB.login(function(response) {
                    if (response.authResponse) {
                        var fbMessage = "Beerify update! I'm drinking " + beerName + " at " +
                            barName + " right now, come join me!";
                        FB.api('/me/feed', 'post', {"message": fbMessage}, function (response) {
                            //https://developers.facebook.com/docs/graph-api/reference/v2.1/page/feed#publish
                            if (!response || response.error) {
                                //console.dir(fbPost);
                                console.log(response.error);

                            } else {
                                console.log('Post ID: ' + response.id);
                            }

                        })
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                },{scope:'publish_actions'});

            })
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
    }
});

module.exports = DrinkingInputView;