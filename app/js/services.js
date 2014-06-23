'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.3')
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
  
  .factory("api", ["$http", "Restangular", function($http, Restangular) {
    var baseUrl = 'http://localhost:4568/api/';
    Restangular.setBaseUrl(baseUrl);
    
    
    
    /* All return promises */
    return {
      getHardDrives: function() {
        return Restangular.all('harddrives').getList();
      },
      getEvents: function() {
        return Restangular.all('events').getList();
        // return $http.get(baseURI + 'events');
      },
      getEvent: function(eventid) {
        return Restangular.one('events',eventid).get();
        // return $http.get(baseURI + 'events/' + eventid);
      },
      createEvent: function(eventObject) {
        var events = Restangular.all('events');
        return events.post(eventObject);
        // return $http.post(baseURI + 'events', eventObject);
      },
      updateEvent: function(eventid, eventObject) {
        return $http.put(baseUrl + 'events/' + eventid, eventObject);
      }
     
    };
  }])
  
  
  ;

            

