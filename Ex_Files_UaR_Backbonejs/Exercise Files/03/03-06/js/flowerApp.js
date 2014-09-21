var wash = new app.singleFlower({
  state: "Washington",
  flower: "Rhododendron macrophyllum"
});

var ore = new app.singleFlower({
  state: "Oregon",
  flower: "Oregon Grape"
});


var flowerGroup = new app.FlowersCollection([
  wash, ore
]);

var flowerGroupView = new app.allFlowersView({ collection: flowerGroup});

$("#stateFlowers").html(flowerGroupView.render().el);

