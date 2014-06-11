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

To run the application on a local server with the `npm` package `http-server`:
```
npm start
```


Todo
----
*  Firebase is unnecessary: instead, should switch to a local database, perhaps sqlite or something. Or jsut even a flat json.txt file that I read in/out?!
*  Name the hard drives
*  Give an image to the hard drives also?
*  Ability to edit the names of the hard drives / edit hard drive notes
*  Ability to edit an event, after it's been created
*  Log each time a hard drive is sent away / returned