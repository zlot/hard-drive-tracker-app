'use strict';


// Declare app level module which depends on filters, and services
angular.module('hardDriveApp', [
  'firebase',
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
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
}]);
