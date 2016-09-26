appUnlogin.controller('regController', ['$scope','$http','$state','$rootScope', function($scope,$http,$state,$rootScope){
    $scope.reg = function(flag){
        if( flag ){
            $http({
                url: '/User/reg',
                method: 'post',
                data: {
                	name: $scope.name,
                    phone: $scope.phone,
                    password: $scope.password,
                    passwordRepeat: $scope.passwordRepeat
                }
            }).success(function(res){
                if( res.resultCode == '000000' ){
                    alert('注册成功');
                    $rootScope.username = res.result.username;
                    $state.go('home');
                }else{
                    alert(res.resultMsg)
                }
            })
        }
    }
}])