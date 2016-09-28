var appUnlogin = angular.module('unlogin_h5', ['ui.router']);
appUnlogin.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider) {
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
  }
]);
var appLogin = angular.module('login_h5',['ui.router']);
appLogin.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home',{
        url: '/home',
        templateUrl: '/static/app/view/home.html',
        controller: 'homeController'
    })
    .state('class',{
        url: '/class/:ctns',
        templateUrl: '/static/app/view/class.html',
        controller: 'classController'
    })
}]);