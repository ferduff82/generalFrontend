
app.controller('mainController', ['$scope','$http','$rootScope','$interval','$location','dataClass','API_PRODUCTS','API_DOLAR', function($scope, $http, $rootScope, $interval, $location, dataClass, API_PRODUCTS, API_DOLAR) {

    /* Paginator Vars */
    $scope.currentPage = 1,
    $scope.numPerPage = 10,
    $scope.maxSize = 8;
    /* End of Paginator Vars */

    currentPage = 0,
    searchValue = null,
    $scope.post = { postId: null };
    $scope.enableInput = true;

  
    $scope.getById = function (id) {
        searchValue = id;
        makeApiCall(searchValue, currentPage);
    };

    function makeApiCall(searchValue, currentPage) {

        dataClass.clearItems();

        $http.get(  API_PRODUCTS.api +
                    searchValue + 
                    "&limit=" + $scope.numPerPage + 
                    "&offset=" + currentPage
            ).then(function(response) {
                $scope.searchResult = response.data.results;

                $scope.colorBack = ($scope.searchResult.length > 0) ? $scope.colorBack = "blue" : $scope.colorBack = "red";

                $scope.searchResult.forEach(function(result) {
                    dataClass.addItem(result);
                });

                $scope.totalItems = response.data.paging.total;
                $scope.products = dataClass.getItems();
                $scope.productsSuccess = true;
                $rootScope.$broadcast('apiCallSuccess'); 
            });
    }

    $scope.$watch('post.postId', function (newValue, oldValue) {

        if (newValue === null) { var newValue = 0 }
        var valueLength = newValue.length;
        
        if (valueLength > 0) { 
            $scope.newValueAdded = "You are entering a new value..." 
        } else {
            $scope.newValueAdded = "" 
        }
    });

    $scope.$watch('currentPage', function(pageChanged) {
        currentPage = pageChanged -1;
        if (searchValue !== null) {
            makeApiCall(searchValue, currentPage);
        }
    });

    function callAtInterval() {
        $http.get( API_DOLAR.api )
            .then(function(response) {
                $scope.dolarLibre = response.data.libre;
                $scope.dolarBlue = response.data.blue;
                $scope.dolarSuccess = true;
            }); 
    }
    callAtInterval();
    $interval(callAtInterval, 100000);

    $scope.getUserName = function (userName) {
        $rootScope.username = userName;
        $rootScope.welcome = 'Welcome ' + userName + '!';
    }

    $rootScope.$on('apiCallSuccess', function () {
        $scope.enableInput = false;
    });

    document.getElementById("filterButton").addEventListener('click', function () {

        var getFilterValue = document.getElementById("filterInput").value;

        $scope.$apply(function () {
            $scope.filterActive = true;
            $scope.fiterValue = getFilterValue;  
        });
    });

    $scope.urlRedirect = $location.absUrl() + "?redirectUsers";

}]);