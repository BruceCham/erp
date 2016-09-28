appLogin.controller('homeListController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$scope.classData = [];
	$http({
		url: '/Res/getAllRes'
	}).success(function(res){
		$scope.classData = res.result;
	});
}]);