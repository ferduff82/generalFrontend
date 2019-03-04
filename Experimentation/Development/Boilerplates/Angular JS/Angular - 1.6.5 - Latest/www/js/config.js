
var app = angular.module('angularStarter', ['ngAnimate','ui.bootstrap','ngRoute']).constant('_', window._);

app.config(function ($provide, $routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl : "/templates/main.html",
            controller  : "mainController"
        })

    $provide.provider("API_PRODUCTS", function () {
        this.$get = function () {
            return {
                api: "https://api.mercadolibre.com/sites/MLA/search?q="
            };
        };
    });

    $provide.provider("API_DOLAR", function () {
        this.$get = function () {
            return {
                api: "http://ws.geeklab.com.ar/dolar/get-dolar-json.php"
            };
        };
    });
});