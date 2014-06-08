'use strict';


// Declare app level module which depends on filters, and services
angular.module('hardDriveApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/hard-drive-table-partial.html', 
      controller: 'TableCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
