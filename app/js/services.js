'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .factory('eventService', function() {
    var hardDrive = {};
    var event1 = {};
    return {
      setHardDrive: function(_hardDrive) {
        hardDrive = _hardDrive;
      },
      setEvent: function(_event) {
        event1 = _event;
      },
      getHardDrive: function() {
        return hardDrive;
      },
      getEvent: function() {
        return event1;
      }
    };
  })
  .factory("FirebaseService", ["$firebase", function($firebase) {
    var firebaseRef = new Firebase("MY FIREBASE.firebaseio.com/hardDrives");
    return $firebase(firebaseRef);
  }])
  ;
