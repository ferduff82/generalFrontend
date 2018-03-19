
app.controller('mainController', ['$scope','$rootScope', 'deliveries',
    function($scope, $rootScope, deliveries) {

        $scope.deliveriesItems = deliveries.items;
        $scope.accordionDisplay = null;
        $scope.mealList = [];

        $scope.selectDelivery = function (id) {

            /* Move to next Screen */

            $rootScope.restaurantSelected = true;
            $rootScope.selectMeal = true;

            /* Get Meals */

            $rootScope.mealsGroup = id.meals;
        };

        $scope.addMealToPurchaseList = function(addedMeal) {

            $scope.totalPrice = 0;
            $scope.mealList.push(addedMeal);

            console.log(addedMeal);

            $scope.mealList.forEach(function(items){
                $scope.totalPrice = $scope.totalPrice + items.price ;
            });
        };

        $scope.backButton = function () {

        };

        $scope.removeMeal = function (index) {
            $scope.mealList.splice(index, 1);
        };

        $scope.displayMeals = function(mealSelected) {
            $scope.accordionDisplay = mealSelected;

            console.log($scope.accordionDisplay);
        }

    }]);