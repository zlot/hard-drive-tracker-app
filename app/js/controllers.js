'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', 'eventService', function($scope, eventService) {

    // DEBUGGING MODAL ONLY! REMOVE THIS AND PLACE IN addEvent() CODE WHEN READY!
    // $('#add-event-modal').modal();
    
    
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
     
      
      
      // $('#date').datepicker({
          // format: "MM d, yyyy",
          // weekStart: 1,
          // todayBtn: "linked"
      // }).on('changeDate', function(e){
          // // $('#date-input').attr("value", e.date);
          // document.getElementById('date-input').setAttribute("value", e.date);
          // // alert(e.date);
      // });
//       
      // give selected hardDrive to eventService, ready for a form submission
      eventService.setHardDrive(hardDrive);
      $scope.$broadcast('modalActivated');
    };
    
  }])
  .controller('ModalCtrl',['$scope', 'eventService', function($scope, eventService) {
    // Empty event object to submit as event when form is filled in.
    // Note that this is ng-model bounded to the form!
    var event = {};
    
    var hardDrive = $scope.hardDrive; 
    // when modal is activated, get hard drive that was selected.
    // the hard drive is passed from bringUpForm to here, via the eventService.
    $scope.$on('modalActivated', function(response) {
      hardDrive = eventService.getHardDrive();
      
    });
    
    $scope.addEvent = function(event) {
      // we have the hardDrive and the event, give to harddrive!
      hardDrive.event = event;
      // clear out the modal form and dismiss
      this.event = {};
      $('#add-event-modal').modal('hide');
    };
    $scope.clearForm = function() {
      this.event = {};
    };
    
  }]);
