angular.module('appService', ['appController']) 

.factory('Menu', function($http) {
  var menu = [{
    id: 0,
    name: 'BREAKFAST',
    lastText: '',
    face: 'img/bonda.png'
  }];
  return {
    all: function() {
      return menu;
    },
    remove: function(chat) {
      menu.splice(menu.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].id === parseInt(chatId)) {
          return menu[i];
        }
      }
      return null;
    }
  };
})
.factory('login',function($http){
  return{
    checkLogin:function(loginData){
      console.log("login data verfication is in progress >>>");
      var promise = $http.post("/admin/login",loginData)
      return promise;
    }
  }
});

