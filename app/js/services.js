'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .value('author', 'Mark C Mitchell')
  .value('firebaseUniqueStr', 'REPLACE_ME_WITH_YOUR_FIREBASE_REFERENCE')
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
  
  .factory("FirebaseService", ["$firebase", "firebaseUniqueStr", function($firebase, firebaseUniqueStr) {
     var firebaseRefForHardDrives = new Firebase("http://" + firebaseUniqueStr + ".firebaseio.com/hardDrives");
     var firebaseRefForEventlog = new Firebase("http://" + firebaseUniqueStr + ".firebaseio.com/eventLog");
     var firebaseHardDrives = $firebase(firebaseRefForHardDrives);
     var firebaseEventLog = $firebase(firebaseRefForEventlog);
     
     return {
       getHardDrives: function() {
        return firebaseHardDrives;
       },
       getEventLog: function() {
         return firebaseEventLog;
       }
     };
  }])
  
  .factory("HardDrivesService", ["FirebaseService", function(firebaseService) {
  // hardDrives listing
    var hardDrives = [
      {
        name: "010",
        arrayPosition: "0",
        size: "? GB",
        notes: "hard drive note.",
        event: {
          location: "",
          date: "",
          notes: "",
          firebaseId: "used to send date back to event log when HD is returned."
        }
      },
      {
        name: "011",
        arrayPosition: "1",
        size: "? GB",
        notes: "hard drive note.",
        event: {
          location: "",
          date: "",
          notes: "",
          firebaseId: "used to send date back to event log when HD is returned."
        }
      }
    ];
    
    return {
      get: function() {
        return firebaseService.getHardDrives();
      },
      setToFirebase: function() {
        firebaseService.getHardDrives().$set(hardDrives);
      }
    };
  }])
  
  .factory("EventLogService", ["FirebaseService", function(firebaseService) {
    var eventLog = [
      {
        hardDriveName: 'hard drive name goes here',
        location: "initial test location",
        date: Date.now(),
        note: "this is a note of the event!",
        returnedDate: Date.now()
      }
    ];
    
    return {
      get: function() {
        return firebaseService.getEventLog();
      },
      addToFirebase: function(event, selectedHardDriveInFirebase) {
        // will be given an $id which can be grabbed from an iteration
        // of events in the EventLog.
        firebaseService.getEventLog().$add(event).then(function(ref) {
          // let promise save event.$id to hardDrive
          selectedHardDriveInFirebase.$child('event').$update({firebaseId: ref.name()});
        });
      },
      updateReturnedDateInFirebase: function(firebaseId, returnedDate) {
        firebaseService.getEventLog().$child(firebaseId).$update({'returnedDate':returnedDate});
      },
      setToFirebase: function() {
        // WIPES OUT EVENT LOG! ONLY FOR DEBUGGING!
        firebaseService.getEventLog().$set(eventLog);
      }
    };
  }])
  
  ;

            

