
var app = angular.module('angularStarter', ['ui.bootstrap','ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl : "/templates/main.html",
            controller  : "mainController"
        })

});