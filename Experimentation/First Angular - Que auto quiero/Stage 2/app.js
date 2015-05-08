var app = angular.module('app', ['ngRoute'])

  .factory('Todos', function(){
    return [
      { name: 'AngularJS Directives', completed: true, note: 'add notes...' },
      { name: 'Data binding', completed: true, note: 'add notes...' },
      { name: '$scope', completed: true, note: 'add notes...' },
      { name: 'Controllers and Modules', completed: true, note: 'add notes...' },
      { name: 'Templates and routes', completed: true, note: 'add notes...' },
      { name: 'Filters and Services', completed: false, note: 'add notes...' },
      { name: 'Get started with Node/ExpressJS', completed: false, note: 'add notes...' },
      { name: 'Setup MongoDB database', completed: false, note: 'add notes...' },
      { name: 'Be awesome!', completed: false, note: 'add notes...' },
    ];     
  })

  .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
    $scope.todos = Todos;
    $scope.name = 'World';
    $scope.keyCode = "";
    $scope.keyPressed = function(e) {
      $scope.keyCode = e.which;
    };

    $scope.update = function() {
      $scope.todos = Todos;
      $scope.newData = $('#newInfo').val();
      $scope.todos.push({
        name: $scope.newData,
        complete: true
      });
    };

    $scope.remove = function(index) { 
      $scope.todos.splice(index, 1);     
    };

    $scope.editItem = function(todo) {
      angular.element(document.getElementById("newInfo")).scope().todo = todo;
    };

    $scope.saveItem = function(todo) {
    };
  }])
  
  .controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
    $scope.todo = Todos[$routeParams.id];
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