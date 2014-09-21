// Namespace our app
var app = app || {};

app.Flower = Backbone.Model.extend({

  initialize: function() {

    this.on('change', function(){
      console.log('The ' + this.get("name") + " model instance just changed!");
    });
    
  }
});