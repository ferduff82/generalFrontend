
app.controller('mainController', ['$scope','$rootScope', 'deliveries',
    function($scope, $rootScope, deliveries) {

        $scope.deliveriesItems = deliveries.items;

        $scope.selectDelivery = function (id) {
            console.log(id);

            $scope.restaurantSelected = true;
        };


    }]);