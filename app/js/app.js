'use strict';


// Declare app level module which depends on filters, and services
angular.module('hardDriveApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/', {
      templateUrl: 'partials/hard-drive-table-partial.html', 
      controller: 'TableCtrl'
    }
  );
  $routeProvider.when('/log', {
    templateUrl: 'partials/event-log-partial.html',
    controller: 'EventLogCtrl'
    }
  );
  $routeProvider.otherwise({redirectTo: '/'});
  
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
}]);
