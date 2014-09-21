angular.module('MyTutorialApp')
    .controller('MainController',
        function MainController($scope, $routeParams) {
           $scope.firsName = "Fernando";

           /* Ejemplo de Parámetros
           $scope.lastName = $routeParams.lastName; 
           */
    });