// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//angular.module('starter', ['ionic', 'starter.controllers'])

var example = angular.module('starter', ['ionic']);

example.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Parse.initialize("6tM6T2do7666kzzrlPzRzQsXJ8hlttnSWyiEyEPW", "clYaSTv8vPeTigDagB9ioZSyAYkdBZqhiHoj74wC");

  });
});

example.controller("ExampleController", function($scope){
  $scope.savePerson = function(firstname,lastname) {
    var PeopleObject = Parse.Object.extend("PeopleObject");
    var person = new PeopleObject();
    person.set("firstname",firstname);
    person.set("lastname", lastname);
    person.save(null, {});
  }

  $scope.getPeople = function(params) {
    var PeopleObject = Parse.Object.extend("PeopleObject");
    var query = new Parse.Query(PeopleObject);
    if(params != undefined) {
      if (query.lastname != undefined) {
        query.equalTo("lastname", params.lastname);
      } 
      if (params != undefined) {
        query.equalTo("firstname", params.firstname);
      }
    }
    query.find({
      success: function(results) {
        alert("Successfully returned " + results.length + " people!");
        for (var i = 0; i < results.length; i++){
          var object = results[i];
          console.log(object.id + " - " + object.get("firstname") + " " + object.get("lastname"));
        }
      }, 
      error: function(error){
        alert ("Error: "+ error.code + " " + error.message);
      }
   });

  }
});

/*
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }


  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

*/