'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', 'HardDrivePassingService', 'EventLogService', 'FirebaseService', 'HardDrivesService', function($scope, hardDrivePassingService, eventLogService, firebaseService, hardDrivesService) {
    $('#date').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          todayBtn: "linked",
          todayHighlight: true
      });
    
    // cheap way of setting active class on navigation
    $('nav #event-log-pill').removeClass('active');
    $('nav #hard-drives-pill').addClass('active');
      
    // bind to firebaseService.
    $scope.hardDrives = firebaseService.getHardDrives();
    // show preloader until data is loaded.
    $scope.hardDrives.$on("loaded", function() {
      $scope.loadedBool = true;
    });
    
    /* used to deal with active class on bootstrap nav-pills. See http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs/23138152#23138152 */
    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          return "active";
        } else {
          return "";
        };
    };
    
    $scope.bringUpForm = function(hardDrive) {
      $('#add-event-modal').modal(); // create modal popup
      // give selected hardDrive to HardDrivePassingService, ready for a form submission
      hardDrivePassingService.setHardDrive(hardDrive);
    };
    
    $scope.removeEvent = function(hardDrive) {
      // when hard drive has returned, update log event to define date
      // for now, it will use date when clicked.
      // ideally, should use date picker again to choose a date.
      eventLogService.updateReturnedDateInFirebase(hardDrive.event.firebaseId, Date.now());
      firebaseService.getHardDrives().$child(hardDrive.arrayPosition).$remove("event");
    };
    
  }])
  .controller('EventLogCtrl', ['$scope', 'FirebaseService', function($scope, firebaseService) {
    // bind $scope to firebaseService.
    $scope.eventLog = firebaseService.getEventLog();
    // show preloader until data is loaded.
    $scope.eventLog.$on("loaded", function() {
      $scope.loadedBool = true;
    });
    // cheap way of setting active class on navigation
    $('nav #hard-drives-pill').removeClass('active');
    $('nav #event-log-pill').addClass('active');    
  }])
  
  .controller('ModalCtrl',['$scope', 'HardDrivePassingService', 'EventLogService', 'FirebaseService', function($scope, hardDrivePassingService, eventLogService, firebaseService) {
    
    var submitPressedOnce = false;
    
    $scope.date = new Date();
    
    // Empty event object to submit as event when form is filled in.
    // Note that this is ng-model bounded to the form!
    $scope.event = {};
    
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
      $scope.hardDrive = hardDrivePassingService.getHardDrive();
      
      var selectedHardDriveInFirebase = firebaseService.getHardDrives().$child($scope.hardDrive.arrayPosition);
      
      // set hardDriveName for eventLog
      $scope.event.hardDriveName = selectedHardDriveInFirebase.name;
      // $scope.event.location, $scope.event.notes are defined by user input in form.
      $scope.event.date = $scope.date;
      
      // push array object to log
      eventLogService.addToFirebase($scope.event, selectedHardDriveInFirebase);
      
      // update the harddrive to state current event
      selectedHardDriveInFirebase.$update({event: $scope.event});
      
      // clear out the modal form and dismiss
      $scope.clearForm();
      $('#add-event-modal').modal('hide');
    }
    
    $scope.$watch('addEventForm.$valid', function(valid) {           
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
