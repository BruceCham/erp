appLogin.controller('classController',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$scope.dataArr = [];
	$http({
		url: '/Res/getAllResByClass',
		params:{
			ctns: $stateParams.ctns.toString()
		},
		method: 'get'
	}).success(function(res){
		if(res.resultCode == '000000'){
			$scope.dataArr = res.result;
		}
	});
}]);