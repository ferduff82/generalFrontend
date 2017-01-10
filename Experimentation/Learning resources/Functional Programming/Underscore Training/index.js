var _ = require("underscore");



/////////////
/* INICIAL */
/////////////


/* No Conflict */
/* Evitar conflictos con otras librerías */

var underscore = _.noConflict();


/* Mixins */
/* Extender funcionalidades de Underscore */

_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});
_("fabio").capitalize(); // "Fabio"






////////////////////
/* Altamente util */
////////////////////


/* Once */
/* Ejecutar una función solo una vez*/

function createApplication() {
	return console.log("app created");
}

var initialize = _.once(createApplication);
initialize();
initialize();


/* Each */
/* Itera datos de un array o una collection */

//Example 1 

var someOtherArray = ["name","patrick","d","w"];

_.each([1, 2, 3], function(num){ console.log(this[num]); }, someOtherArray);

//Example 2 

_.each([1, 2, 3], function(someThing) {
  console.log(someThing);
})

//Example 3
//traer los 3 últimos 

lister = ['a', 'c', 'd', 'w', 'e'];

_.each(lister.reverse(), function(val,i){
	console.log(val, i)
})



/* Contains */
/* Busca si algún valor coincide con el que se pasa */

_.contains([1, 2, 3], 3); // true


/* Pluck */
/* Trae los valores de cada key dentro de un objeto */

var Tuts = [{name : 'NetTuts', niche : 'Web Development'}, {name : 'WPTuts', niche : 'WordPress'}, {name : 'PSDTuts', niche : 'PhotoShop'}, {name : 'AeTuts', niche : 'After Effects'}];
var niches = _.pluck(Tuts, 'niche');
 
console.log(niches);


/* Map */
/* Mapea los valores de una key dentro de un objeto */

var Tuts = [{name : 'NetTuts', niche : 'Web Development'}, {name : 'WPTuts', niche : 'WordPress'}, {name : 'PSDTuts', niche : 'PhotoShop'}, {name : 'AeTuts', niche : 'After Effects'}];
 
var names = _(Tuts).pluck('name').map(function (value){return value + '+'});
 
console.log(names);


/* findWhere */
/* Busca en toda la collection el valor que matchee y lo muestra completo */

_.findWhere(publicServicePulitzers, {newsroom: "The New York Times"}); 
/*{year: 1918, newsroom: "The New York Times",
  reason: "For its public service in publishing in full so many official reports,
  documents and speeches by European statesmen relating to the progress and
  conduct of the war."}
*/


/* Map Object */
/* Puede mapear las keys y los valores de un objeto */

_.mapObject({start: 5, end: 12}, function(val, key) {
  return val + 5;
}); // {start: 10, end: 17}



/* Extend */
/* Permite extender las propiedades del objeto */

_.extend({name: 'moe'}, {age: 50}); // {name: 'moe', age: 50}



/* Templating */
/* Sistema de plantilla para mostrar datos en el DOM */

var data =   {site: 'NetTuts'}, template =   'Welcome! You are at <%= site %>';
 
var parsedTemplate = _.template(template,  data );
 
console.log(parsedTemplate);






///////////////////////
/* Medianamente util */
///////////////////////


/* All */
/* Chequeda todos los datos para saber cuales pasan un determinado criterio */

var Scores = [95, 82, 98, 78, 65];
var hasPassed = _(Scores).all(function (value){return value > 50;});
 
console.log(hasPassed);


/* Uniq */
/* Limpia los datos repetidos en un Array */

var uniqTest = _.uniq([1,5,4,4,5,2,1,1,3,2,2,3,4,1]);
 
console.log(uniqTest);


/* Range */
/* brinda numeros intermedios entre un valor y otro */

var tens = _.range(0, 100, 10);
 
console.log(tens);


/* Intersection */
/* brinda numeros intermedios entre un valor y otro */

var tens = _.range(0, 100, 10), eights = _.range(0, 100, 8), fives = _.range(0, 100, 5);
 
var common = _.intersection(tens, eights, fives );
 
console.log(common);







/////////////
/* Rápidas */
/////////////


/* Find */
/* Encuentra el primer valor dependiendo de una condición de TRUE */

var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); // 2


/* Filter */
/* Filtra todos los valores dependiendo de una condición de TRUE */

var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); // [2, 4, 6]


/* Reject */
/* Al contrario de Filter retorna solo los resultados FALSE */

var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); // [1, 3, 5]


/* Max */ // _.max(list, [iteratee], [context]) 
/* Obtener el máximo de un valor de un objeto y que retorne ese objeto */

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

_.max(stooges, function(stooge){ return stooge.age; }); // {name: 'curly', age: 60};


/* Min */ //_.min(list, [iteratee], [context]) 
/* Obtener el mínimo de un valor de un objeto o array */

var numbers = [10, 5, 100, 2, 1000];
_.min(numbers);
=> 2


/* First */ 
/* Obtener el primer elemento de un array */

_.first([5, 4, 3, 2, 1]); // 5


/* Last */
/* Obtener el último elemento de un array */

_.last([5, 4, 3, 2, 1]); // 1


/* Without */
/* Eliminar valores de un Array */

_.without([1, 2, 1, 0, 3, 1, 4], 0, 1); // [2, 3, 4]


/* Index Of */
/* Obtener la posición de un elemento de un Array */

_.indexOf([1, 2, 3], 2); //1


/* Last Index Of */
/* Obtener la última posición de un elemento de un Array */

_.lastIndexOf([1, 2, 3, 1, 2, 3], 2); //4


/* Find Index */
/* Retorna el primer index donde pasó la condición de verdadero */

var users = [{'id': 1, 'name': 'Bob', 'last': 'Brown'},
             {'id': 2, 'name': 'Ted', 'last': 'White'},
             {'id': 3, 'name': 'Frank', 'last': 'James'},
             {'id': 4, 'name': 'Ted', 'last': 'Jones'}];
_.findLastIndex(users, {
  name: 'Ted'
}); //3