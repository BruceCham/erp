appLogin.controller('homeClassController',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$scope.dataArr = [];
	$scope.activeCSindex = null;//null 不显示，非null 显示
	$scope.showResDetail = function(o){
		$scope.activeCSindex = o.cs;
		$scope.sn = o.sn || o.cs;
		$scope.sp = o.sp;
		$scope.op = o.op;
		$scope.ctns = o.ctns;
		$scope.byMe = o.byMe;
		$scope.isDisable = o.op && !o.byMe;
	}
	$scope.putRes = function(flag){
		if( flag ){
			$http({
				url: '/Res/updateResByCtns',
				method: 'post',
				data: {
					sn: $scope.sn,
					sp: $scope.sp,
					ctns: $scope.ctns
				}
			}).success(function(res){
				if( res.resultCode == '000000' ){
					alert('操作成功');
					location.reload();
				}else{
					alert( res.resultMsg );
				}
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
			var o = $scope.dataArr[0];
			$scope.activeCSindex = o.cs;
			$scope.sn = o.sn || o.cs;
			$scope.sp = o.sp;
			$scope.op = o.op;
			$scope.ctns = o.ctns;
			$scope.byMe = o.byMe;
			$scope.isDisable = o.op && !o.byMe;
		}
	});
}]);