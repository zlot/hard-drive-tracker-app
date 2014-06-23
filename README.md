hard-drive-tracker-app
======================

Simple Hard Drive Tracker App using Angular.js &amp; a REST API connected to an sqlite db, for The Monkey's Cobbler. Running locally off a Sinatra server.

Built from the [angular-seed project](https://github.com/angular/angular-seed.git).

Instructions
------------
```
npm install
```

This will also call `bower install` to install app dependencies. To add more dependencies edit the `bower.json` and run `bower install` again.

**note:** Make sure to use `angular#1.3.x`, not the stable version `1.2.x`. Only `1.3.x` allows `input=date` form validation.

When we are ready to go live on our local network, copy the `app/` folder to `public/` in the `hard-drive-tracker-app-api` project. This project is setup to run both the API and this app via the one Sinatra server.

Then, just run `ruby main.rb` from the `hard-drive-tracker-app-api` project.


Todo
----
*  Give an image to the hard drives also?
*  Ability to edit the names of the hard drives / edit hard drive notes
*  Ability to edit an event, after it's been created
*  ~~Add authentication so not anyone can just start editing our firebase~~
*  ~~Firebase is unnecessary: instead, should switch to a local database, perhaps sqlite or something. Or jsut even a flat json.txt file that I read in/out?!~~
*  ~~Name the hard drives~~
*  ~~Log each time a hard drive is sent away / returned~~