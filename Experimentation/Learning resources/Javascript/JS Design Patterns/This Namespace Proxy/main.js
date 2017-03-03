var myApp = {};
(function(){
  // Private variables / properties
  var foo = 'Hello';
  var bar = 'World';
 
  //Private method
  var myMessage = function(){
    return foo + ' ' + bar;
  };
 
  // Public Method
  this.sum = function( param1, param2 ){
    return param1 + param2;
  };
 
}).apply( myApp );
 
console.log( myApp.sum( 10, 5 ) ); // 15
console.log( myApp.myMessage() ); // Error, myApp.myMessage is not a function