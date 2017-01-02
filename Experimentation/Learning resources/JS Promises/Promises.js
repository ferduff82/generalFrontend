let cleanRoom = function() {
  return new Promise(function(resolve, reject) {
    resolve('Cleaned The Room');
  });
};

let removeGarbage = function(message) {
  return new Promise(function(resolve, reject) {
    resolve(message + ' remove Garbage');
  });
};

let winIcecream = function(message) {
  return new Promise(function(resolve, reject) {
    resolve( message + ' won Icecream');
  });
};

// Chaining Promises

cleanRoom().then(function(result){
	return removeGarbage(result);
}).then(function(result){
	return winIcecream(result);
}).then(function(result){
	console.log('finished ' + result);
})

// All Promises finished

Promise.all([cleanRoom(),removeGarbage(),winIcecream()]).then(function(){
	console.log("all finished");
})

// One Promise finished

Promise.race([cleanRoom(),removeGarbage(),winIcecream()]).then(function(){
	console.log("One of them is finished");
})

// Promise Rejected or Resolved

let promiseToCleanTheRoom = new Promise(function(resolve, reject) {

  let isClean = false;

  if (isClean) {
    resolve('Clean');
  } else {
    reject('not Clean');
  }
});

promiseToCleanTheRoom.then(function(fromResolve) {
  console.log('the room is' + fromResolve);
}).catch(function(fromReject){
	console.log('the room is' + fromReject);
})