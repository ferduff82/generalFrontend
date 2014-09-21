'use strict';

angular.module('MyTutorialApp', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/hi',
		{
			templateUrl:'songsList.html',
			controller: 'MainController'
		});
        
        /* Ejemplo de Parámetros
        $routeProvider.when('/hi/:lastName',
        {
            templateUrl:'songsList.html',
            controller: 'MainController'
        });
        */
	});

