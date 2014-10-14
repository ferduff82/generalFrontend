var app = angular.module("myApp", [])
    
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
    	templateUrl: 'list.html',
    	controller: 'ListCtrl'
      });
}]);

app.directive('h5', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<h3>Hello World!!</h3>'
  };
});

app.directive('myDomDirective', function () {
    return {
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.html('You clicked me!');
            });
            element.bind('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});

app.factory('Data', function () {
	return { message: "I'm data from a service" }
});

app.factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
});