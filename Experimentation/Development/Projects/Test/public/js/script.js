
var Song = Backbone.Model.extend({
  defaults: {
    name: "Not specified",
    artist: "Not specified"
  },
  initialize: function(){
      console.log("Music is the answer");
  }
});

var Album = Backbone.Collection.extend({
  model: Song
});

var song1 = new Song({ name: "How Bizarre", artist: "OMC" });
var song2 = new Song({ name: "Sexual Healing", artist: "Marvin Gaye" });
var song3 = new Song({ name: "Talk It Over In Bed", artist: "OMC" });

var myAlbum = new Album([ song1, song2, song3]);
console.log( myAlbum.models ); // [song1, song2, song3]