

angular.module('appController', ['ngRoute']) 

.controller('loginController',['$q','$scope','login','$location',function($q,$scope,appService,$location) {
     
    $scope.message = 'Failed to login';
    $scope.submitForm = function(data){
        console.log(">>>>>>>>>>>>>",data);
        return appService.checkLogin(data).then(function(res){
            console.log("res is >>>",res);

            $scope.loginResult = res.data.message;
            $location.path('/success');
        })
        /*.error(function(error){
            console.log("error is >>>",error);
            $scope.loginResult = error;
        })*/

    }
     
}])
.controller('homeController',['$q','$scope','login','$location',function($q,$scope,appService,$location) {
     
    $scope.message = 'This is home page';
     
}])
