virtualDisco.config(function($routeProvider, $locationProvider) {
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