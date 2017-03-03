function constructorPattern(data) {
  this.name = data.name;
  this.title = data.title;
  this.startDate = data.startDate;
}

var constructorUse = new constructorPattern();