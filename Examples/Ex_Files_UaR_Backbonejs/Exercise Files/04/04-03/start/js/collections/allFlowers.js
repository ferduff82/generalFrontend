// Namespace our flowerApp
var app = app || {};

// A group (array) of Flower models
app.FlowersCollection = Backbone.Collection.extend({

  // What type of models are in this collection?
  model: app.singleFlower

});