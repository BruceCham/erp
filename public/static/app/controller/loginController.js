app.controller('loginController', ['$scope','$http', function($scope,$http){
    $scope.login = function(flag){
        if( flag ){
            $http({
                url: '/login',
                method: 'post',
                data: {
                    phone: $scope.phone,
                    password: $scope.password
                }
            }).success(function(res){
                console.log(res)
            })
        }
    }
}])