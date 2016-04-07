Search Movies Demo
==================

SUMMARY:
This is a demo using the AngularJS framework, Bootstrap Sass for styling, Gulp for rapid development and Bower for 
package management. It consumes the themoviedb.org API as a service to provide search results. It will also create 
a distributable build with all CSS and JS concatenated and minified through Gulp.

VIEW WORKING DEMO:
http://52.10.114.186/

INSTALLATION:
You need to have Node.js (Node) installed onto your computer before you can install Gulp.
If you do not have Node installed already, you can get it by downloading the package installer from Node's website:
https://nodejs.org/en/

INSTALL COMMANDS:
$ bower install
$ sudo npm install gulp -g
$ npm init
$ npm install

RUN THE DEMO:
$ gulp watch
(Point your browser to http://localhost:3000/)

FINAL BUILD:
You can create a distributable build with all CSS and JS concatenated and minified by running this command:
$ gulp build