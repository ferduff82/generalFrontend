
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

virtualDisco.controller('bolichesController',['$scope', '$routeParams', '$route', function ($scope, $routeParams, $route) {

    /* Podemos ejecutar un evento cuando se produzca un cambio de ruta
    $rootScope.$on('$routeChangeSuccess', function () {
        console.log($routeParams.key);
    });
    */
    $scope.showUsername = $routeParams.user.username;
    $scope.showEdad = $routeParams.user.edad;
    $scope.showSex = $routeParams.user.sex;
    $scope.showEmail = $routeParams.user.email;
}]);

virtualDisco.controller('bolichesControllerSuccess',['$scope', '$routeParams', '$route', function ($scope, $routeParams, $route) {

    $scope.showNombre = $routeParams.boliches.nombre;
    $scope.showCapacidad = $routeParams.boliches.capacidad;
    $scope.showCantBarras = $routeParams.boliches.cantBarras;
    $scope.showReservados = $routeParams.boliches.reservados;    
    $scope.showFreePass = $routeParams.boliches.freePass; 
}]);