var app = angular.module('h5_angularjs', ['ui.router','ngDialog']);
app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login',{
        url: '/login',
        templateUrl: '/static/app/view/login.html',
        controller: 'loginController'
    })
    .state('reg',{
        url: '/reg',
        templateUrl: '/static/app/view/reg.html',
        controller: 'regController'
    })
    .state('home',{
        url: '/home',
        templateUrl: '/static/app/view/home.html',
        controller: 'homeController'
    })
    .state('error{code}',{
        url: '/error/:code',
        templateUrl: '/static/app/view/error.html',
        controller: ["$scope","$routeParams",function($scope,$routeParams){
            $scope.errorCode = $routeParams.code;
        }]
    });
  }
]);