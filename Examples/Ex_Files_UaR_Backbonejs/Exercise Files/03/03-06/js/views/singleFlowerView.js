// Namespace our flowerApp
var app = app || {};

app.singleFlowerView = Backbone.View.extend({

  tagName: "article",
  className: "flowerListItem",

  template: _.template( $("#stateFlowerElement").html() ),

  render: function() {
    var flowerTemplate = this.template(this.model.toJSON());
    this.$el.html(flowerTemplate);
    return this;
  }

});