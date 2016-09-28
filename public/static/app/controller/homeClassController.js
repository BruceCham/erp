appLogin.controller('homeClassController',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$scope.dataArr = [];
	$scope.ResDetail = $scope.dataArr[0];;
	$scope.showResDetail = function(o){
		$scope.ResDetail = o;
	}
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