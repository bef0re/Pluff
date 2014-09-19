'use strict';

angular.module('pluffApp', [
  'pluffApp.controllers',
  'pluffApp.services',
  'ngRoute',
  'ngAnimate'
])
.config(function($routeProvider, $locationProvider) {
  // TODO: Everything.
  $routeProvider
  .when('/', {
    templateUrl: 'partials/timetable.html',
    controller: 'TimeTableCtrl'
  })
  .when('/query/:query', {
    templateUrl: 'partials/timetable.html',
    controller: 'TimeTableCtrl',
    resolve: {
      logging: function($route) {
        // $route.reload()
        console.log('Query is ' + $route.current.params.query);
      }
    }
  });

  $locationProvider.html5Mode(true);
});

var APIconfig = {
  rawUrl: 'https://apps.fhict.nl/api/v1',
  callback: '&callback=JSON_CALLBACK',
  loginUrl: 'https://portal.fhict.nl/CookieAuth.dll?GetLogon?reason=0&formdir=6',
  url: function(url) {
    // Enclose the given _relative_ url with the absolute url + callback.
    // TODO: Replace ampersand with questionmark if needed (maybe not necessary?)
    return this.rawUrl + url + this.callback;
  }
};
