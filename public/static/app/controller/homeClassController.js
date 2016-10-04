appLogin.controller('homeClassController',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$scope.dataArr = [];
	// $scope.activeCSindex = 0;//null 不显示，非null 显示
	$scope.showResDetail = function(o,i){
		// if( $scope.activeCSindex != null && $scope.activeCSindex != i) return;
		// $scope.activeCSindex = $scope.activeCSindex == i?null:i;
		$scope.activeCSindex = i;
		$scope.sn = o.sn || o.cs;
		$scope.sp = o.sp;
		$scope.op = o.op;
		$scope.ctns = o.ctns;
		$scope.byMe = o.byMe;
	}
	$scope.putRes = function(flag){
		console.log($scope.snInput);
		console.log($scope.sp);
		return;
		if( flag ){
			$http({
				url: 'Res/updateResByCtns',
				method: 'post',
				data: {
					sn: $scope.snInput,
					sp: $scope.spInput,
					ctns: $scope.ctns
				}
			}).success(function(res){
				console.log(res)
			})
		}
	}
	$http({
		url: '/Res/getAllResByClass',
		params:{
			ctn: $stateParams.ctn.toString()
		},
		method: 'get'
	}).success(function(res){
		if(res.resultCode == '000000'){
			$scope.dataArr = res.result;
		}
	});
}]);