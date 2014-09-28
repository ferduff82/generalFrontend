'use strict';

angular.module('MyTutorialApp')
	.controller('HiCtrl',
	function HiCtrl($scope, DataProcess) {
		$scope.data = [10, 20, 30];

		$scope.process = function () {
			$scope.data = DataProcess.process($scope.data);
		}
	});