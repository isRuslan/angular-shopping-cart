# [AngularJS Store](http://angular-store.herokuapp.com/)
<img src=http://gruntjs.com/img/grunt-logo.png width=200/> &nbsp; <img src=http://angularjs.org/img/AngularJS-large.png width=250 /> &nbsp; <img src=http://lesscss.org/public/img/logo.png />

An simple frontend kickstarter based on [AngularJS](http://angularjs.org), [Grunt](http://gruntjs.org) and [LESS](http://lesscss.org) for online store.<br/>
* [ngBoilerplate](http://joshdmiller.github.com/ng-boilerplate) was taken as skeleton project.
* [Heroku](https://heroku.com) is using for [production demo](http://angular-store.herokuapp.com/)
* It is just a fork of [A-Shopping-Cart-Application-Built-with-AngularJS](http://www.codeproject.com/Articles/576246/A-Shopping-Cart-Application-Built-with-AngularJS)

## Quick Start
Install Node.js and then:
```sh
$ git clone git@github.com:bu-bu/angular-shopping-cart.git
$ cd angular-shopping-cart
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt
```

## Grunt commands
* `grunt` or `grunt watch` - build developer project (build dir)
* `grunt prod` - build production project (prod dir)
* `grunt test` - run tests

## Tools
* [AngularJS](http://angularjs.org) - Base framework
* [Grunt](http://gruntjs.org) - Build tool
* [LESS](http://lesscss.org) - CSS, but smth more
* [Animate.css](http://daneden.github.io/animate.css/) - Animation library, use with ng-animate
* [Numeral.js](http://numeraljs.com/) - Work with numbers, use with filter

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
angular-shopping-cart/
  |- karma/
  |- src/
  |  |- app/
  |  |  |- <app logic>
  |  |- assets/
  |  |  |- <static files>
  |  |- common/
  |  |  |- <reusable code>
  |  |- less/
  |  |  |- main.less
  |- vendor/
  |  |- angular/
  |  |- bootstrap/
  |  |- etc ..
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```

What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `karma/` - test configuration.
- `src/` - our application sources. [Read more &raquo;](src/README.md)
- `vendor/` - third-party libraries. [Bower](http://bower.io) will install
  packages here. Anything added to this directory will need to be manually added
  to `build.config.js` and `karma/karma-unit.js` to be picked up by the build
  system.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `vendor/` directory.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `build.config.js` - our customizable build settings; see "The Build System"
  below.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.

### The Build System

The best way to learn about the build system is by familiarizing yourself with
Grunt and then reading through the heavily documented build script,
`Gruntfile.js`. But you don't need to do that to be very productive with
`ngBoilerplate`. What follows in this section is a quick introduction to the
tasks provided and should be plenty to get you started.

The driver of the process is the `delta` multi-task, which watches for file
changes using `grunt-contrib-watch` and executes one of nine tasks when a file
changes:

* `delta:gruntfile` - When `Gruntfile.js` changes, this task runs the linter
  (`jshint`) on that one file and reloads the configuration.
* `delta:assets` - When any file within `src/assets/` changes, all asset files
  are copied to `build/assets/`.
* `delta:html` - When `src/index.html` changes, it is compiled as a Grunt
  template, so script names, etc., are dynamically replaced with the correct
  values configured dynamically by Grunt.
* `delta:less` - When any `*.less` file within `src/` changes, the
  `src/less/main.less` file is linted and copied into
  `build/assets/ng-boilerplate.css`.
* `delta:jssrc` - When any JavaScript file within `src/` that does not end in
  `.spec.js` changes, all JavaScript sources are linted, all unit tests are run,
  and the all source files are re-copied to `build/src`.
* `delta:coffeesrc` - When any `*.coffee` file in `src/` that doesn't match
  `*.spec.coffee` changes, the Coffee scripts are compiled independently into
  `build/src` in a structure mirroring where they were in `src/` so it's easy to
  locate problems. For example, the file
  `src/common/titleService/titleService.coffee` is compiled to
  `build/src/common/titleService/titleService.js`.
* `delta:tpls` - When any `*.tpl.html` file within `src/` changes, all templates
  are put into strings in a JavaScript file (technically two, one for
  `src/common/` and another for `src/app/`) that will add the template to
  AngularJS's
  [`$templateCache`](http://docs.angularjs.org/api/ng.$templateCache) so
  template files are part of the initial JavaScript payload and do not require
  any future XHR.  The template cache files are `build/template-app.js` and
  `build/template-common.js`.
* `delta:jsunit` - When any `*.spec.js` file in `src/` changes, the test files
  are linted and the unit tests are executed.
* `delta:coffeeunit` - When any `*.spec.coffee` file in `src/` changes, the test
  files are linted, compiled their tests executed.

As covered in the previous section, `grunt watch` will execute a full build
up-front and then run any of the aforementioned `delta:*` tasks as needed to
ensure the fastest possible build. So whenever you're working on your project,
start with:

```sh
$ grunt
```

And everything will be done automatically!

When you're ready to push your app into production, just run the `prod`
command:

```sh
$ grunt prod
```
This will concatenate and minify your sources and place them by default into the
`prod/` directory. There will only be three files: `index.html`,
`your-app-name.js`, and `your-app-name.css`. All of the vendor dependencies like
Bootstrap styles and AngularJS itself have been added to them for super-easy
deploying. If you use any assets (`src/assets/`) then they will be copied to
`prod/` as is.
