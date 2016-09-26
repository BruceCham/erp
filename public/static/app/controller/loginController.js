appUnlogin.controller('loginController', ['$scope','$http',function($scope,$http){
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
                    location.reload();
                }else{
                    alert(res.resultMsg);
                }
            })
        }
    }
}])