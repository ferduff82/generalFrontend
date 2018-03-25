
var app = angular.module('deliveryOnline', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl : "/templates/main.html",
            controller  : "mainController"
        })

});