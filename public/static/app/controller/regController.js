appUnlogin.controller('regController', ['$scope','$http','$state', function($scope,$http,$state){
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
                    $state.go('login');
                }else{
                    alert(res.resultMsg)
                }
            })
        }
    }
}])