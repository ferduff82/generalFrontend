app.controller("myCtrl", function($scope, Data, ergastAPIservice) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.eMail = "ferduff82@hotmail.com";

	$scope.files = ['foo','bar', 'baz'];

	$scope.objects =   [
	  {name:'John', age:25, gender:'boy'},
	  {name:'Jessie', age:30, gender:'girl'},
	  {name:'Johanna', age:28, gender:'girl'},
	  {name:'Joy', age:15, gender:'girl'},
	  {name:'Mary', age:28, gender:'girl'},
	  {name:'Peter', age:95, gender:'boy'},
	  {name:'Sebastian', age:50, gender:'boy'},
	  {name:'Erika', age:27, gender:'girl'},
	  {name:'Patrick', age:40, gender:'boy'},
	  {name:'Samantha', age:60, gender:'girl'}
	]

	$scope.alerta = alert("Funciona");

    $scope.data = Data;


    $scope.nameFilter = null;
    $scope.driversList = [];

    ergastAPIservice.getDrivers().success(function (response) {
    //Dig into the responde to get the relevant data
    $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });

	$scope.searchFilter = function (driver) {
	    var keyword = new RegExp($scope.nameFilter, 'i');
	    return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
	};
    
});