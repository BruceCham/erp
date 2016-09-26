appLogin.controller('homeController',['$scope','$http','$state',function($scope,$http,$state){
	$http({
		url: '/Res/getAllRes',
		method: 'post'
	}).success(function(res){
		console.log(res);
	});
	$scope.logout = function(){
		$http({
			url: '/User/logout',
			method: 'get'
		}).success(function(res){
			if( res.resultCode == '000000' ){
				alert('退出成功');
				$state.go('login');
			}else{
				alert(res.resultMsg);
			}
		});
	}
}])