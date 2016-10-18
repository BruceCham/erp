appLogin.controller('homeInfoController', ['$scope','$http', function($scope,$http){
		$scope.dataArrs = [];
		$scope.count = [0];
		$http({
			url: '/Res/getResByMe'
		}).success(function(res){
			if( res.resultCode == '000000' ){
				$scope.dataArrs = res.result.list;
				$scope.count = res.result.count;
			}
		});
}])