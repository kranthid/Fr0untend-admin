angular.module('foodApp', ['appController','appService','ngRoute']) 
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/success', {
        templateUrl: 'public/pages/activity.html',
        controller: 'homeController'
      }).
      when('/test', {
        templateUrl: 'public/pages/login.html',
        controller: 'loginController'
      })
  }])

