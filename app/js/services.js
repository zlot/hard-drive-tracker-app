'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .factory('eventService', function() {
    // containers for the real json objects to be passed through.
    var hardDrive = {};
    return {
      setHardDrive: function(_hardDrive) {
        hardDrive = _hardDrive;
      },
      getHardDrive: function() {
        return hardDrive;
      }
    };
  })
  .factory("FirebaseService", ["$firebase", function($firebase) {
    var firebaseRef = new Firebase("MY FIREBASE.firebaseio.com/hardDrives");
    return $firebase(firebaseRef);
  }])
  ;
