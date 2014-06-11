'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', 'eventService', 'EventLogService', 'FirebaseService', 'HardDrivesService', function($scope, eventService, eventLogService, firebaseService, hardDrivesService) {
    
    // either bind model to local hardDrives for testing:
    // $scope.hardDrives = hardDrivesService.get();
    // or bind to firebaseService.
    $scope.hardDrives = firebaseService;
    // override and set local hardDrives json to firebase:
    // hardDrivesService.setToFirebase();
    
    $scope.bringUpForm = function(hardDrive) {
      // create a modal popup
      $('#add-event-modal').modal();
      $('#date').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          todayBtn: "linked",
          todayHighlight: true
      });
      // give selected hardDrive to eventService, ready for a form submission
      eventService.setHardDrive(hardDrive);
      $scope.$broadcast('modalActivated');
    };
    
    $scope.removeEvent = function(hardDrive) {
      // when hard drive has returned, update log event to define date
      // for now, it will use date when clicked.
      // ideally, should use date picker again to choose a date.
      // find log date
      eventLogService.updateReturnedDate(hardDrive.event.logId, Date.now());
      
      // firebaseService.$child(hardDrive.arrayPosition).$remove("event");
      
      
      hardDrive.event = [];
    };
    
  }])
  .controller('ModalCtrl',['$scope', 'eventService', 'EventLogService', 'FirebaseService', function($scope, eventService, eventLogService, firebaseService) {
    
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
        
        addEventToLog();
        
      } else {
        // not valid, don't submit
        $('#submit').removeClass('btn-primary').addClass('btn-danger');
        // turn invalid fields dirty to get colorizing
        $('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
      }
    };
    
    function addEventToLog() {
      // push array object to log
      eventLogService.push($scope.event);
      // get the id (array position) of log
      // set this as logId for event
      $scope.event.logId = eventLogService.get().length-1;
      
      // we have the hardDrive and the event, give to harddrive!
      $scope.hardDrive.event = $scope.event;
      // firebaseService.$child($scope.hardDrive.arrayPosition).$update({event: $scope.event});
      
      // clear out the modal form and dismiss
      $scope.clearForm();
      $('#add-event-modal').modal('hide');
    }
    
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
