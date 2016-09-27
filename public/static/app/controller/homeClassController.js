appLogin.controller('homeClassController',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$http({
		url: '/Res/getAllResByClass',
		params:{
			ctns: $stateParams.ctns.toString()
		},
		method: 'get'
	}).success(function(res){
		console.log(res)
	});
}]);