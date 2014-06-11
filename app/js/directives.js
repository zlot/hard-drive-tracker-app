'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    // Directives that want to modify the DOM typically use the link option
    // https://docs.angularjs.org/guide/directive
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.text(version);
      }   
    };
  }])
  .directive('addEventModal',function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/add-form-modal-partial.html'
    };
  })
  .directive('debugHardDrives', ['HardDrivesService', '$interval', function(hardDrivesService, $interval) {
    // updates what the hardDrives local object looks like every 1000ms
    return {
      link: function(scope, element, attrs) {
        function updateDisplay() {
        element.text("hardDrives local object: \t\r\n" + 
          JSON.stringify(hardDrivesService.get(), null, '\t'));
        };
        
        // todo:: can I place ModalCtrl or TableCtrl dependency for this directive;
        //   then use a $scope.$watch on a button press?
        // start the UI update process; save the timeoutId for canceling
        $interval(function() {
          updateDisplay(); // update DOM
        }, 1000);        
      }
    };
  }])
  ;