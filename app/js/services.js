'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.2')
  .value('author', 'Mark C Mitchell')
  .factory('HardDrivePassingService', function() {
    /* used to pass selected Hard Drive from TableCtrl to ModalCtrl. */
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
  
  .factory("api", ["$http", function($http) {
    var baseURI = 'http://localhost:4567/api/';
    return {
      getHardDrives: function() {
        return $http.get(baseURI + 'harddrives');
      },
      getEvents: function() {
        return $http.get(baseURI + 'events');
      },
      getEvent: function(eventid) {
        return $http.get(baseURI + 'events/' + eventid);
      },
      createEvent: function(eventObject) {
        return $http.post(baseURI + 'events', eventObject);
      },
      updateEvent: function(eventid, eventObject) {
        return $http.put(baseURI + 'events/' + eventid, eventObject);
      }
     
    };
  }])
  
  
  ;

            

