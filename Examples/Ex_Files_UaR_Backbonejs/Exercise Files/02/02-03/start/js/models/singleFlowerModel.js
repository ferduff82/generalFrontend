// Namespace our app
var app = app || {};

app.singleFlower = Backbone.Model.extend({

  defaults: {
    color: "pink",
    img: "images/placeholder.jpg"
  },

  initialize: function() {
    console.log("A model instance named " + this.get("name") +  " has been created and it costs " + this.get("price"));

    this.on('change', function(){
      console.log("Something in our model has changed");
    });

    this.on('change:price', function(){
      console.log("The price for the " + this.get("name") + " model just changed to $" + this.get("price") + " dollars");
    });

  }
  
});