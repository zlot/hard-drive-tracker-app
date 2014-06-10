'use strict';


// Declare app level module which depends on filters, and services
angular.module('hardDriveApp', [
  'firebase',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/hard-drive-table-partial.html', 
      controller: 'TableCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
