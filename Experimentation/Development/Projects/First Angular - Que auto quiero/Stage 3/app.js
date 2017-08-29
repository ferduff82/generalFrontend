var app = angular.module('app', ['ngRoute'])

  .controller('TodoController', ['$scope', function ($scope) {

    $scope.saved = localStorage.getItem('toddos');
    $scope.toddos = (localStorage.getItem('toddos')!==null) ? JSON.parse($scope.saved) : [ {name: 'Learn AngularJS', done: false}, {name: 'Build an Angular app', done: false} ];
    localStorage.setItem('toddos', JSON.stringify($scope.toddos));

    $scope.update = function() {
      $scope.toddos.push({
        name: $scope.todoText,
        done: false
      });
      $scope.todoText = '';
      localStorage.setItem('toddos', JSON.stringify($scope.toddos));
    }

    $scope.remove = function(index) { 
      $scope.toddos.splice(index, 1);    
      localStorage.setItem('toddos', JSON.stringify($scope.toddos)); 
    }

    $scope.editing = null;

    $scope.editItem = function(item) {
      $scope.editing = item;
    }

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.toddos, function(todo){
        count+= todo.done ? 0 : 1;
      });
      return count;
    }

  }])
  
  .controller('TodoDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.todo = TodoSingle[$routeParams.id];
  }])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      })
    
      .when('/:id', {
        templateUrl: '/todoDetails.html',
        controller: 'TodoDetailCtrl'
      });
  }]);