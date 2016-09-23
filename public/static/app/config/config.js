var app = angular.module('h5_angularjs', ['ngRoute']);
app.config(["$routeProvider",function($routeProvider) {
  $routeProvider
    .when('/login',{
        templateUrl: '/static/app/view/login.html',
        controller: 'loginController'
    })
    .when('/reg',{
        templateUrl: '/static/app/view/reg.html',
        controller: 'regController'
    })
    .when('/home',{
        templateUrl: '/static/app/view/home.html'
    })
    .when('/error/:code',{
        templateUrl: '/static/app/view/error.html',
        controller: ["$scope","$routeParams",function($scope,$routeParams){
            $scope.errorCode = $routeParams.code;
        }]
    })
    .otherwise({
      redirectTo: '/login'
    });
  }
]);