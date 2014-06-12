hard-drive-tracker-app
======================

Simple Hard Drive Tracker App using Angular.js &amp; Firebase, for The Monkey's Cobbler.

Built from the [angular-seed project](https://github.com/angular/angular-seed.git).

Instructions
------------
```
npm install
```

This will also call `bower install` to install app dependencies. To add more dependencies edit the `bower.json` and run `bower install` again.

**note:** Make sure to use `angular#1.3.x`, not the stable version `1.2.x`. Only `1.3.x` allows `input=date` form validation.

Then, replace `"MY FIREBASE.firebaseio.com/hardDrives"` in `services.js` to the correct `firebase.io` reference.

To run the application on a local server with the `npm` package `http-server`:
```
npm start
```


Todo
----
*  Add authentication so not anyone can just start editing our firebase
*  Firebase is unnecessary: instead, should switch to a local database, perhaps sqlite or something. Or jsut even a flat json.txt file that I read in/out?!
*  Give an image to the hard drives also?
*  Ability to edit the names of the hard drives / edit hard drive notes
*  Ability to edit an event, after it's been created
*  ~~Name the hard drives~~
*  ~~Log each time a hard drive is sent away / returned~~