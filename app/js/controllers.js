'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', function($scope) {
    // controls the listing of the hard drive table
    
    // hardDrives listing
    $scope.hardDrives = [
      {
        name: "test",
        size: "test",
        notes: "test",
        isOut: false
      }
    ];
    // event listing
    $scope.events = [
      {
        location: "",
        date: "",
        notes: ""
      }
    ];
    
      
  }]);
