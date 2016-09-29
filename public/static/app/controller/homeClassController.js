appLogin.controller('homeClassController',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$scope.dataArr = [];
	$scope.activeCSindex = 0;//null 不显示，非null 显示
	$scope.showResDetail = function(o,i){
		// if( $scope.activeCSindex != null && $scope.activeCSindex != i) return;
		// $scope.activeCSindex = $scope.activeCSindex == i?null:i;
		$scope.activeCSindex = i;
		$scope.sn = o.sn || o.cs;
		$scope.sp = o.sp;
		$scope.op = o.op;
		$scope.byMe = o.byMe;
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
			var o = $scope.dataArr[0];
			$scope.activeCSindex = 0;
			$scope.sn = o.sn || o.cs;
			$scope.sp = o.sp;
			$scope.op = o.op;
			$scope.byMe = o.byMe;
			// $scope.ResDetail = $scope.dataArr[0];
		}
	});
}]);