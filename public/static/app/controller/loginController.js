app.controller('loginController', ['$scope','$http','$state','$rootScope',function($scope,$http,$state,$rootScope){
    $scope.login = function(flag){
        if( flag ){
            $http({
                url: '/User/login',
                method: 'post',
                data: {
                    phone: $scope.phone,
                    password: $scope.password
                }
            }).success(function(res){
                if(res.resultCode == '000000'){
                    alert('登录成功');
                    $rootScope.username = res.result.username;
                    $state.go('home');
                }else{
                    alert(res.resultMsg);
                    $rootScope.username = res.result.username;
                    $state.go('home');
                }
            })
        }
    }
}])