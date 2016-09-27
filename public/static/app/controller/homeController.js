appLogin.controller('homeController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$scope.classData = [];
	$http({
		url: '/Res/getAllResByClass',
		// data:{
		// 	ct: '1',
		// 	cn: '1601'
		// },
		params:{
			ct: '1',
			cn: '1601'
		},
		method: 'get'
	}).success(function(res){
		$scope.classData = res.result;
	});
	$rootScope.logout = function(){
		$http({
			url: '/User/logout',
			method: 'get'
		}).success(function(res){
			if( res.resultCode == '000000' ){
				alert('退出成功');
				location.reload();
			}else{
				alert(res.resultMsg);
			}
		});
	}
}]);