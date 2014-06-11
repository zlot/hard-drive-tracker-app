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
  ;