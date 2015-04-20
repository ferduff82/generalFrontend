var tantalizingTulips = new app.Flower({
  name: "Tantalizing Tulips",
  price: 10.95,
  color: "White"
});

var fleurDisLis = new app.Flower({
  name: "Fleur Dis Lis",
  price: 50,
  color: "Orange"
});

var flowerGroup = new app.EuropeanFlower([
  tantalizingTulips, fleurDisLis
]);


tantalizingTulips.set("originCountry", "Holland");

console.log(flowerGroup.toJSON());