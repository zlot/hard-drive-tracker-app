'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TableCtrl', ['$scope', 'HardDrivePassingService', 'api', function($scope, hardDrivePassingService, api) {
    $('#date').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          todayBtn: "linked",
          todayHighlight: true
      });
    $('#return-date').datepicker({
          format: "yyyy-mm-dd",
          weekStart: 1,
          todayBtn: "linked",
          todayHighlight: true
      });  
    
    // cheap way of setting active class on navigation
    $('nav #event-log-pill').removeClass('active');
    $('nav #hard-drives-pill').addClass('active');
      
    // bind $scope to JSON returned from REST API.
    // API returns a promise which we must return asynchronously using then().
    function bindScope() {
      api.getHardDrives().then(function(resp) {
        
        // console.log(resp);
        $scope.loadedBool = true;
        $scope.hardDrives = resp;
        // for each harddrive:
        for(var i=0;i<$scope.hardDrives.length;i++) {
          /* to get i inside the promise, we must capture i in a closure!
           * See http://stackoverflow.com/questions/17244614/promise-in-a-loop
           * or: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures,
           * the part that says Creating closures in loops: A common mistake
           */
          (function(i) {
            if($scope.hardDrives[i].current_eventid !== null) { 
              api.getEvent($scope.hardDrives[i].current_eventid).then(function(resp) {
                $scope.hardDrives[i].location = resp.location;
                $scope.hardDrives[i].date = resp.date;
                $scope.hardDrives[i].eventnote = resp.note;
              });
            }
          })(i);
        }
      });
    }
    bindScope();
    
    $scope.$on('modelUpdated', function(e) {
      bindScope();  
    });

    // show preloader until data is loaded.
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
      // must use $root to broadcast.
      $scope.$root.$broadcast('modalPopup');
    };
    
    $scope.removeEvent = function(hardDrive) {
      // give selected hardDrive to HardDrivePassingService, ready for a form submission
      hardDrivePassingService.setHardDrive(hardDrive);
      
      $('#returned-event-modal').modal(); // create modal popup
    };
    
  }])
  .controller('EventLogCtrl', ['$scope', 'api', function($scope, api) {
    
    // bind $scope to JSON returned from REST API.
    // API returns a promise which we must return asynchronously using then().
    api.getEvents().then(function(resp) {
      // show preloader until data is loaded.
      $scope.loadedBool = true;
      $scope.eventLog = resp;
    });
    
    // cheap way of setting active class on navigation
    $('nav #hard-drives-pill').removeClass('active');
    $('nav #event-log-pill').addClass('active');    
  }])
  
  .controller('ModalCtrl',['$scope', 'HardDrivePassingService', 'api', function($scope, hardDrivePassingService, api) {
    var submitPressedOnce = false;

    // set the correct scope when modal is called
    $scope.$on('modalPopup', function(event) {
      $scope.hardDrive = hardDrivePassingService.getHardDrive();
    });

    $scope.date = new Date();
    
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

      api.createEvent({
        'location' : $scope.event.location,
        'date'     : $scope.date,
        'note'     : $scope.event.note,
        'harddrive_name' : $scope.hardDrive.name
      }).then(function(resp) {
        $scope.$root.$broadcast('modelUpdated');
        $scope.clearForm();
        $('#add-event-modal').modal('hide');
      });
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
  }])
  
  .controller('ReturnedFormCtrl',['$scope', 'HardDrivePassingService', 'api', function($scope, hardDrivePassingService, api) {
    
    var submitPressedOnce = false;
    
    $scope.date = new Date();
    
    $('#returned-event-modal').on('show.bs.modal', function(e) {
      $scope.hardDriveName = hardDrivePassingService.getHardDrive().name;
      $scope.location = hardDrivePassingService.getHardDrive().location;
    });
    
    $scope.validateForm = function(returnedForm) {
      submitPressedOnce = true;
      
      if(returnedForm.$valid) {
         updateEventInLog();
      } else {
        // not valid, don't submit
        $('#submit').removeClass('btn-primary').addClass('btn-danger');
        // turn invalid fields dirty to get colorizing
        $('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
      }
    };
    
    function updateEventInLog() {
      $scope.hardDrive = hardDrivePassingService.getHardDrive();
      
      // PUTS to api
      api.updateEvent($scope.hardDrive.current_eventid, {
        'returned_date' : $scope.date,
        'returned_note' : $scope.note
      }).then(function(resp) {
        $scope.$root.$broadcast('modelUpdated');
      });
      
      // clear out the modal form and dismiss
      $scope.clearForm();
      $('#returned-event-modal').modal('hide');
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
      $scope.note = '';
      $('#return-date').datepicker('update', new Date());
      $scope.returnedForm.$setPristine();
    };
  }])
  ;
