/*
	Developer: Hafiz Faraz Mukhtar
	Blog:  	   http://blog.hfarazm.com/ 
	Contact:   http://www.fb.com/h.farazmukhtar/
	Liscense:  MIT license 2014
*/

var GuitarControllers = angular.module("GuitarControllers", ['ngAnimate']);

GuitarControllers.controller("ListController", ['$scope','$http', 
	function($scope, $http)
		{    
			$http.get('js/data.json').success (function(data){
				$scope.guitarVariable = data;
				$scope.orderGuitar = 'price';			
			}); 
		}]
);

GuitarControllers.controller("DetailsController", ['$scope','$http','$routeParams',
	function($scope, $http, $routeParams)
		{    
			$http.get('js/data.json').success (function(data){
				$scope.guitarVariable = data;
				$scope.whichGuitar = $routeParams.guitarID;

				/* Guitar details page navigation logic */
				if($routeParams.guitarID > 0)
					$scope.prevGuitar = Number($routeParams.guitarID)-1;
				else
					$scope.prevGuitar = $scope.guitarVariable.length-1;

				if($routeParams.guitarID < $scope.guitarVariable.length-1)
					$scope.nextGuitar = Number($routeParams.guitarID)+1;
				else
					$scope.nextGuitar = 0;

			}); 
		}]
);

GuitarControllers.controller('TabController', function (){
	this.tab = 1;
    
    this.selectTab = function (setTab){
    	this.tab = setTab;
    };
    this.isSelected = function(checkTab) {
    	return this.tab === checkTab;
    };
});


GuitarControllers.controller('ReviewController', function (){
	this.review = {};

	this.addReview = function(guitarID){
		this.review.createdOn = Date.now();
		guitarID.reviews.push(this.review);
		this.review = {};
	};
});


GuitarControllers.directive('userReviews', function() {
  return {
    restrict    : 'E',  // used E because of element 
    templateUrl : 'partials/cDirectives/reviews.html'
  };
});