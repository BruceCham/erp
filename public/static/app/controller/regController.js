app.controller('regController', ['$scope','$http', function($scope,$http){
    $scope.reg = function(flag){
        if( flag ){
            $http({
                url: '/reg',
                method: 'post',
                data: {
                	name: $scope.name,
                    phone: $scope.phone,
                    password: $scope.password,
                    passwordRepeat: $scope.passwordRepeat
                }
            }).success(function(res){
                console.log(res)
            })
        }
    }
}])