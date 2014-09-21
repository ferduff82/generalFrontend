app.controller("MainController", function($scope){
    $scope.understand = "I now understand how the scope works!";

    $scope.recipe = [
    	{ name : "Fernando", value : "29"},
    	{ name : "Martin", value : "24"},
    	{ name : "Leandro", value : "43"},
    	{ name : "Jose", value : "21"},
    	{ name : "Laureano", value : "54"},
    	{ name : "Cristian", value : "25"}
    ]

    $scope.name = "Ferchu";

    $scope.showandhide = true;

    $scope.someValue = 1;

});


app.directive('changeColor', function(){
    return function(scope, element, attr){
        element.css({
            "color" : "yellow",
            "background-color" : "red"
        });
    }
});