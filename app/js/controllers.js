'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', 'eventService', 'FirebaseService', 'HardDrivesService', function($scope, eventService, firebaseService, hardDrivesService) {
    
    // either bind model to local hardDrives for testing:
    $scope.hardDrives = hardDrivesService.get();
    // or bind to firebaseService.
    // $scope.hardDrives = firebaseService;
    // firebaseService.$set($scope.hardDrives);
    // hardDrivesService.setToFirebase();
    
    $scope.removeEvent = function(hardDrive) {
      firebaseService.$child(hardDrive.arrayPosition).$remove("event");
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
      $('.date').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          todayBtn: "linked",
          todayHighlight: true
      });
      // give selected hardDrive to eventService, ready for a form submission
      eventService.setHardDrive(hardDrive);
      $scope.$broadcast('modalActivated');
    };
    
  }])
  .controller('ModalCtrl',['$scope', 'eventService', 'FirebaseService', function($scope, eventService, firebaseService) {
    
    var submitPressedOnce = false;
    
    $scope.date = new Date();
    
    // Empty event object to submit as event when form is filled in.
    // Note that this is ng-model bounded to the form!
    $scope.event = {};
    
    // when modal is activated, get hard drive that was selected.
    // the hard drive is passed from bringUpForm to here, via the eventService.
    $scope.$on('modalActivated', function(response) {
      $scope.hardDrive = eventService.getHardDrive();
    });
    
    
    $scope.validateForm = function(addEventForm) {
      submitPressedOnce = true;
      
      if(addEventForm.$valid) {
        $scope.event.date = $scope.date;
        
        // we have the hardDrive and the event, give to harddrive!
        firebaseService.$child($scope.hardDrive.arrayPosition).$update({event: $scope.event});
        
        // clear out the modal form and dismiss
        $scope.clearForm();
        $('#add-event-modal').modal('hide');
      } else {
        // not valid, don't submit
        $('#submit').removeClass('btn-primary').addClass('btn-danger');
        // turn invalid fields dirty to get colorizing
        $('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
      }
    };
    
    $scope.$watch('addEventForm.$valid', function(valid) {           
        //$scope.valid = newVal;
        // $scope.informationStatus = true;
        if(valid) {
          $('#submit').removeClass('btn-danger').addClass('btn-success');
        } else {
          $('#submit').removeClass('btn-success').addClass('btn-danger');
        }
    });
    
    $scope.clearForm = function() {
      // reset form
      this.event = {};
      $('#date').val('');
      $scope.addEventForm.$setPristine();
    };
  }]);
