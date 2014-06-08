'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', function($scope) {

    // DEBUGGING MODAL ONLY! REMOVE THIS AND PLACE IN addEvent() CODE WHEN READY!
    //$('#add-event-modal').modal();
    
    // Empty event object to submit as event when form is filled in.
    // will have properties: location, date, notes.
    event = {};

    
    // hardDrives listing
    $scope.hardDrives = [
      {
        name: "Hard Drive 1",
        size: "500GB",
        notes: "This is a test note.",
        event: {
          location: "this is a location",
          date: Date.now(),
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu consectetur nisl. Fusce nec metus magna. Mauris enim arcu, venenatis quis ullamcorper eu, hendrerit semper erat. Aliquam faucibus luctus elit, congue pharetra justo faucibus feugiat. Morbi placerat quam non nisl luctus, ac dictum est laoreet. Aenean eget cursus nulla. Ut ante tortor, vehicula vel dictum ultrices, euismod a justo. Donec ac ultrices massa. Etiam sed lobortis est. Cras sit amet sagittis lacus. Quisque vitae sem lacus. Vestibulum dictum, felis et aliquam accumsan, ipsum tortor auctor augue, sit amet aliquet tortor elit posuere lacus. Aenean pellentesque, libero ut vulputate hendrerit, dolor massa sagittis nibh, non dignissim leo nisi id urna. Quisque lorem nunc, vehicula nec felis eu, sagittis pellentesque velit. Donec consequat eget augue sit amet luctus."
        }
      }
    ];
    
    $scope.removeEvent = function(hardDrive) {
      hardDrive.event = [];
    };
    
    $scope.bringUpForm = function(hardDrive) {
      // create a modal popup
      $('#add-event-modal').modal();
      $('#date').datepicker({
          format: "MM d, yyyy",
          weekStart: 1,
          todayBtn: "linked"
      });
      
      
    };
    
    $scope.addEvent = function() {
        
    };
    
  }]);
