'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', 'eventService', 'EventLogService', 'FirebaseService', 'HardDrivesService', function($scope, eventService, eventLogService, firebaseService, hardDrivesService) {
    $('#date').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          todayBtn: "linked",
          todayHighlight: true
      });
    // either bind model to local hardDrives for testing:
    // $scope.hardDrives = hardDrivesService.get();
    // or bind to firebaseService.
    $scope.hardDrives = firebaseService.getHardDrives();
    // override and set local hardDrives json to firebase:
    hardDrivesService.setToFirebase();
    
    $scope.bringUpForm = function(hardDrive) {
      // create a modal popup
      $('#add-event-modal').modal();
      
      // give selected hardDrive to eventService, ready for a form submission
      eventService.setHardDrive(hardDrive);
      // NOT ACTUALLY WORKING:: because it only broadcasts within scope?
      // and the .$on is inside ModalCtrl, outside of scope?
      // $scope.$broadcast('modalActivated');
    };
    
    $scope.removeEvent = function(hardDrive) {
      // when hard drive has returned, update log event to define date
      // for now, it will use date when clicked.
      // ideally, should use date picker again to choose a date.
      // find log date
      eventLogService.updateReturnedDate(hardDrive.event.logId, Date.now());
      
      firebaseService.getHardDrives().$child(hardDrive.arrayPosition).$remove("event");
      
      //%%%%% UNNECESSARY ONCE FIREBASE IS IN USE?
      hardDrive.event = [];
    };
    
  }])
  .controller('EventLogCtrl', ['$scope', 'eventService', 'EventLogService', 'FirebaseService', 'HardDrivesService', function($scope, eventService, eventLogService, firebaseService, hardDrivesService) {
    
    // either bind model to local eventLog for testing:
    // $scope.eventLog = eventLogService.get();
    // or bind to firebaseService.
    $scope.eventLog = firebaseService.getEventLog();
    // override and set local eventLogService json to firebase:
    // eventLogService.setToFirebase();
    
  }])
  
  
  .controller('ModalCtrl',['$scope', 'eventService', 'EventLogService', 'FirebaseService', function($scope, eventService, eventLogService, firebaseService) {
    
    var submitPressedOnce = false;
    
    $scope.date = new Date();
    
    // Empty event object to submit as event when form is filled in.
    // Note that this is ng-model bounded to the form!
    $scope.event = {};
    
    // when modal is activated, get hard drive that was selected.
    // the hard drive is passed from bringUpForm to here, via the eventService.
    // NOTE:: NOT WORKING, $broadcast or $emit only works if this $on is within
    // the current scope of where $broadcast/$emit is called?
    // $scope.$on('modalActivated', function(response) {
      // $scope.hardDrive = eventService.getHardDrive();
      // alert("$scope.hardDrive");
    // });
    
    
    $scope.validateForm = function(addEventForm) {
      submitPressedOnce = true;
      
      if(addEventForm.$valid) {
        addEventToLog();
      } else {
        // not valid, don't submit
        $('#submit').removeClass('btn-primary').addClass('btn-danger');
        // turn invalid fields dirty to get colorizing
        $('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
      }
    };
    
    function addEventToLog() {
      $scope.hardDrive = eventService.getHardDrive();
      
      // $scope.event.location, $scope.event.notes are defined by user input in form.
      $scope.event.date = $scope.date;
      
      // push array object to log
      eventLogService.push($scope.event);
      // get the id (array position) of log
      // set this as logId for event
      $scope.event.logId = eventLogService.get().length-1;
      // add harddrive to the event log
       eventLogService.addHardDriveToLog($scope.event.logId, $scope.hardDrive.name);
      
      // we have the hardDrive and the event, give to harddrive!
      $scope.hardDrive.event = $scope.event;
      firebaseService.getHardDrives().$child($scope.hardDrive.arrayPosition).$update({event: $scope.event});
      
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
      $('#date').datepicker('update', new Date());
      $scope.addEventForm.$setPristine();
    };
  }]);
