
var virtualDisco = angular.module('virtualDisco', ['ngRoute']);

virtualDisco.factory('mainClassUser', function($http) {

    var mainUserClass = function(username, edad, sex, email, password) {
        this.username = username;
        this.edad = edad;
        this.sex = sex;
        this.email = email;
        this.password = password;
    };
    return mainUserClass;
});

virtualDisco.factory('mainClassDiscos', function($http) {

    var mainDiscoClass = function(nombre, capacidad, cantBarras, reservados, freePass) {
        this.nombre = nombre;        
        this.capacidad = capacidad;
        this.cantBarras = cantBarras;
        this.reservados = reservados;
        this.freePass = freePass;
    };
    return mainDiscoClass;
});;
virtualDisco.controller('userInstance',['$scope','mainClassUser', '$location', function ($scope, mainClassUser, $location) {
    $scope.send = function() {
        var user = new mainClassUser( $scope.username, $scope.edad, $scope.sex, $scope.email, $scope.password );
        $location.path('/boliches').search({user: user});
    };        
}]);

virtualDisco.controller('bolichesInstance',['$scope','mainClassDiscos', '$location', function ($scope, mainClassDiscos, $location) {

    $scope.send = function() {
        var boliches = new mainClassDiscos( $scope.nombre, $scope.capacidad, $scope.cantBarras, $scope.reservados, $scope.freePass );
        $location.path('/boliches-success').search({boliches: boliches});
    };        
}]);

virtualDisco.controller('bolichesController',['$scope', '$routeParams', '$route', '$http', function ($scope, $routeParams, $route, $http) {

    /* Podemos ejecutar un evento cuando se produzca un cambio de ruta
    $rootScope.$on('$routeChangeSuccess', function () {
        console.log($routeParams.key);
    });
    */
    $scope.showUsername = $routeParams.user.username;
    $scope.showEdad = $routeParams.user.edad;
    $scope.showSex = $routeParams.user.sex;
    $scope.showEmail = $routeParams.user.email;


    $http.get("http://demo1861308.mockable.io/fdfesf").then(function(response) {
        $scope.myData = response.data.results;
    });

}]);

virtualDisco.controller('bolichesControllerSuccess',['$scope', '$routeParams', '$route', function ($scope, $routeParams, $route) {

    $scope.showNombre = $routeParams.boliches.nombre;
    $scope.showCapacidad = $routeParams.boliches.capacidad;
    $scope.showCantBarras = $routeParams.boliches.cantBarras;
    $scope.showReservados = $routeParams.boliches.reservados;    
    $scope.showFreePass = $routeParams.boliches.freePass; 
}]);;virtualDisco.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'userInstance'
        })
        .when('/addBoliches', {
            templateUrl : 'addBoliches.html',
            controller  : 'bolichesInstance'
        })
        .when('/boliches', {
            templateUrl : 'boliches.html',
            controller  : 'bolichesController'
        })
        .when('/boliches-success', {
            templateUrl : 'boliches-success.html',
            controller  : 'bolichesControllerSuccess'
        });
});