
/**********/
/* Lodash */
/**********/


/////////////////////
/* Importance: Low */
/////////////////////

///////////
/* Array */

/* Fill */
var array = [1, 2, 3];
_.fill(array, 'a');
// => ['a', 'a', 'a']


/* Flatten Deep / Flatten Depth*/
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
var array = [1, [2, [3, [4]], 5]];
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]


/* Pull */
var array = ['a', 'b', 'c', 'a', 'b', 'c']; 
_.pull(array, 'a', 'c');
// => ['b', 'b']


/* Pull At*/
var array = ['a', 'b', 'c', 'd'];
var pulled = _.pullAt(array, [1, 3]);
console.log(array);
// => ['a', 'c']
console.log(pulled);
// => ['b', 'd']


/* Reverse */
var array = [1, 2, 3];
_.reverse(array);
// => [3, 2, 1]


/* Without */
_.without([2, 1, 2, 3], 1, 2);
// => [3]


////////////////
/* Collection */

/* Zip */
_.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]




////////////////////////
/* Importance: Medium */
////////////////////////

///////////
/* Array */

/* Difference */
_.difference([2, 1], [2, 3]);
// => [1]


/* Find Index */
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
_.findIndex(users, ['active', false]);
// => 0
_.findIndex(users, 'active');
// => 2


/* Index Of */
_.indexOf([1, 2, 1, 2], 2);
// => 1


/* Last */
_.last([1, 2, 3]);
// => 3


/* Slice */
var array =[1,2,3,4,5,6,7,8];
var test = _.slice(array, 3, 5);
// [4,5]


/* Includes */
_.includes([1, 2, 3], 1);
// => true


////////////////
/* Collection */

/* Order by */
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 }
];
_.orderBy(users, ['age'], ['asc']);
// => objects for [['barney', 34], ['fred', 48]]


/////////////
/* Objects */

/* Pick */
var object = { 'a': 1, 'b': '2', 'c': 3 };
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }


///////////////
/* Functions */

/* Times */
function getRandomInteger() {
    return Math.round(Math.random() * 100);
}
var result = _.times(5, getRandomNumber);
// result => [64, 70, 29, 10, 23]


////////////
/* Number */

/* Random */
_.random(15, 20);
//16,17,18,19,20




//////////////////////
/* Importance: High */
//////////////////////


/* Intersection */
_.intersection([2, 1], [2, 3]);
// => [2]


/* Union */
_.union([2], [1, 2]);
// => [2, 1]


/* Uniq / Sorted Uniq*/
_.uniq([2, 1, 2]);
// => [2, 1]
_.sortedUniq([1, 1, 2, 3, 3, 5, 8, 8]);
// -> [1, 2, 3, 5, 8]


/* Sample (Trae un elemento Random)*/
_.sample([1, 2, 3, 4]);
// => 2


/* Shuffle */
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]


/* Once */
var initialize = _.once(createApplication);
// => `createApplication` is invoked once


/* Range */
_.range(4);
// => [0, 1, 2, 3]


/* Key By */
var posts = [
    { id: "1abc", title: "First blog post", content: "..." },
    { id: "2abc", title: "Second blog post", content: "..." },
    { id: "34abc", title: "The blog post we want", content: "..." }
];
posts = _.keyBy(posts, "id");
var post = posts["34abc"]
// post -> { id: "34abc", title: "The blog post we want", content: "..." }


/* Assign */
var foo = { a: "a property" };
var bar = { b: 4, c: "an other property" };
var result = _.assign({ a: "an old property" }, foo, bar);
// result => { a: 'a property', b: 4, c: 'an other property' }




////////////////////
/* Common Methods */
////////////////////

/* Map */
/* Find (returns only the first element that matches) */
/* Filter */
/* Reduce */
/* Bind */
/* Debounce */