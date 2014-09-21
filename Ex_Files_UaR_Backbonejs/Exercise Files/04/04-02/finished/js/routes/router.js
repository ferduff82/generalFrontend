// Namespace our flowerApp
var app = app || {};

app.Router = Backbone.Router.extend({

routes :{
	"": "noCopy",
	"heirloomRose" : "heirloomRoseMessage",
	"rainbowRose": "rainbowRoseMessage",
	"redRose" : "redRoseMessage"
},

});