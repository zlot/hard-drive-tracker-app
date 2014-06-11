'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .value('author', 'Mark C Mitchell')
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
  .factory("HardDrivesService", ["FirebaseService", function(firebaseService) {
  // hardDrives listing
    var hardDrives = [
      {
        name: "Hard Drive 1",
        arrayPosition: "0",
        size: "500GB",
        notes: "This is a test note.",
        event: {
          location: "this is a location",
          date: Date.now(),
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque, libero ut vulputate hendrerit, dolor massa sagittis nibh, non dignissim leo nisi id urna. Quisque lorem nunc, vehicula nec felis eu, sagittis pellentesque velit. Donec consequat eget augue sit amet luctus."
        }
      },
      {
        name: "Hard Drive 2",
        arrayPosition: "1",
        size: "1TB",
        notes: "This is a test note.",
        event: {
          location: "this is a location",
          date: Date.now(),
          notes: "Aliquam faucibus luctus elit, congue pharetra justo faucibus feugiat. Morbi placerat quam non nisl luctus, ac dictum est laoreet. Aenean eget cursus nulla. Ut ante tortor, vehicula vel dictum ultrices, euismod a justo. Donec ac ultrices massa. Etiam sed lobortis est. Cras sit amet sagittis lacus. Quisque vitae sem lacus. Vestibulum dictum, felis et aliquam accumsan, ipsum tortor auctor augue, sit amet aliquet tortor elit posuere lacus. Aenean pellentesque, libero ut vulputate hendrerit, dolor massa sagittis nibh, non dignissim leo nisi id urna. Quisque lorem nunc, vehicula nec felis eu, sagittis pellentesque velit. Donec consequat eget augue sit amet luctus."
        }
      },
      {
        name: "Hard Drive 3",
        arrayPosition: "2",
        size: "2TB",
        notes: "This is a test note.",
        event: {
          location: "this is a location",
          date: Date.now(),
          notes: "Lorem ipsum dolor sit amet, consectetur add., non dignissim leo nisi id urna. Quisque lorem nunc, vehicula nec felis eu, sagittis pellentesque velit. Donec consequat eget augue sit amet luctus."
        }
      }
    ];
    
    return {
      get: function() {
        return hardDrives;
      },
      setToFirebase: function() {
        firebaseService.$set(hardDrives);
      }
    };
  }]);

            

