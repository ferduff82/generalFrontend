// Namespace our flowerApp
var app = app || {};

app.FlowersCollection = Backbone.Collection.extend({

  model: app.singleFlower

});