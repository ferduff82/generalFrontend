function factoryPattern(data) {
  var factory = {};
  factory.name = data.name;
  factory.title = data.title;
  factory.startDate = data.startDate;
  return factory;
}
var factoryUse = factoryPattern(jsonObj);