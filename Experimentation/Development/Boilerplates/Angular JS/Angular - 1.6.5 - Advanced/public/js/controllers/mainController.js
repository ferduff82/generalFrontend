
app.controller('mainController', ['$scope', 'deliveries',

    function($scope, deliveries) {

        $scope.deliveriesItems = deliveries.items;
        $scope.accordionDisplay = null;
        $scope.pageStatus = 1;
        $scope.mealList = [];

        /*
         *  Select Restaurant
         */

        $scope.selectDelivery = function (id) {
            $scope.pageStatus = 2;
            $scope.mealsGroup = id.meals;
            handlePagination();
        };

        /*
         *  Calculate preview prices
         */

        $scope.addMealToPurchaseList = function(addedMeal) {
            $scope.mealList.push(addedMeal);
            var removedDup = removeDuplicates($scope.mealList,'name');

            $scope.mealList = removedDup;
            calculateTotal();
        };

        $scope.changeAmount = function (index, itemSize) {
            $scope.mealList[index].amount = itemSize;
            $scope.mealList[index].totalLocal = $scope.mealList[index].amount * $scope.mealList[index].price;
            calculateTotal();
        };

        $scope.removeMeal = function (index) {
            $scope.mealList.splice(index, 1);
            calculateTotal();
        };

        function calculateTotal() {
            $scope.totalPrice = 0;
            $scope.mealList.forEach(function(items){
                $scope.amountPrice = items.amount * items.price ;
                $scope.totalPrice = $scope.totalPrice + $scope.amountPrice;
            });
        }

        function removeDuplicates(mealList, prop) {
            return mealList.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
        }

        /*
         *  Generate JSON String
         */

        $scope.endDeliver = function () {

            /* Add form data to final Object */

            var deliverObject = {
                personalData : {},
                requestOrder : {}
            };

            deliverObject.personalData['name'] = this.name;
            deliverObject.personalData['lastName'] = this.lastName;
            deliverObject.personalData['address'] = this.address;
            deliverObject.personalData['phone'] = this.phone;
            deliverObject.personalData['email'] = this.email;

            /* Parse Angular JSON to JSON */

            var orderParsed = JSON.parse(angular.toJson($scope.mealList));

            /* Add Total value to final Object */

            var totalValueObj = {};
            totalValueObj['total'] = $scope.totalPrice;
            orderParsed.push(totalValueObj);

            /* Stringify JSON and display */

            deliverObject.requestOrder = orderParsed;
            $scope.displayDataObject = JSON.stringify(deliverObject, null, 4);

            $scope.jsonDisplay = true;
        };

        /*
         *  Handle Pagination
         */

        $scope.backButton = function () {
            $scope.mealList = [];
            $scope.pageStatus = 1;
            handlePagination();
        };

        $scope.continueToEnd = function () {
            if ($scope.mealList.length > 0) {
                $scope.pageStatus = 3;
                handlePagination();
            }
        };

        $scope.lastBackButton = function () {
            $scope.pageStatus = 2;
            handlePagination();
        };

        function handlePagination() {
            if ($scope.pageStatus === 1) {
                $scope.restaurantSelected = false;
                $scope.selectMeal = false;
                $scope.leftSelection = false;
            } else if ($scope.pageStatus === 2) {
                $scope.restaurantSelected = true;
                $scope.selectMeal = true;
                $scope.hideSecondBack = false;
                $scope.showForm = false;
                $scope.hideMakeOrder = false;
                $scope.hideContinue = false;
                $scope.leftSelection = false;
            } else {
                $scope.leftSelection = true;
                $scope.showForm = true;
                $scope.hideContinue = true;
                $scope.hideMakeOrder = true;
                $scope.hideSecondBack = true;
            }
        }

        /*
         *  Accordion Display
         */

        $scope.displayMeals = function(mealSelected) {
            $scope.accordionDisplay = mealSelected;
        }

    }]);