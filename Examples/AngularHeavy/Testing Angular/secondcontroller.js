app.controller("secondController", function($scope){

    $scope.value1 = "0";
    $scope.value2 = "0";
    $scope.total = "0";

    $scope.calculate = function (){
        $scope.total = parseInt( $scope.value1 ) + parseInt( $scope.value2 );
    }

});