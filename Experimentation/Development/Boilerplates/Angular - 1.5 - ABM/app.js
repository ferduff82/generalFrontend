
var app = angular.module('abmModule', []);

app.controller('abmMainController', function($scope){ 

    $scope.visible = false;
    $scope.email_expression = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Create the array to hold the list of Users

    $scope.dataUsers = [
        {name:"Fernando", lastName:"Arias", user: "Internal", email: "fer@hotmail.com"},
        {name:"Sebastián", lastName:"Romero", user: "Internal", email: "seba@gmail.com"},
        {name:"Maria", lastName:"Lavolpe", user: "External", email: "maria@gmail.com"},
        {name:"José", lastName:"López", user: "Internal", email: "jose@gmail.com"},
        {name:"Lorena", lastName:"Lewis", user: "External", email: "lorena@gmail.com"},
        {name:"Erica", lastName:"Gomez", user: "Internal", email: "erica@gmail.com"}
    ];

    $scope.userType = [
        "Internal",
        "External"
    ];

    // Create the function to push the data into the ABM Array

    $scope.newAbm = function(){

        $scope.dataUsers.push({name:$scope.addName, lastName:$scope.addLastName, email: $scope.emailAdress, user:$scope.typeOfUser});   

        $scope.addName = undefined;
        $scope.addLastName = undefined;
        $scope.emailAdress = undefined;
        $scope.typeOfUser = undefined;
    };
        
    $scope.remove=function(item){ 
      var index=$scope.dataUsers.indexOf(item)
      $scope.dataUsers.splice(index,1);     
    }

});
