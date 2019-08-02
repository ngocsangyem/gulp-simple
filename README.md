<h1 align="center">Welcome to gulp-simple 👋</h1>

[![gulp-simple](https://img.shields.io/badge/version-2.0.0-orange.svg?cacheSeconds=2592000)](https://github.com/ngocsangyem/HTML-Build-Tool)
[![node](https://img.shields.io/badge/node-%3E%3D10.x.x-green.svg)](https://nodejs.org/en/)
[![gulp](https://img.shields.io/badge/gulp-4.0.0-red.svg)](https://gulpjs.com/)
![MIT license](https://img.shields.io/github/license/ngocsangyem/HTML-Build-Tool.svg)

## Features

| Feature                      | Summary                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sass support                 | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more (Run `gulp` for project compiling). In our WSK we follow Sass [guidelines](https://sass-guidelin.es/#architecture).                                                                                                                |
| Performance optimization     | Minify and concatenate JavaScript, CSS, HTML and images to help keep your pages lean (Run `npm run build` to create an optimised version of your project to `production` folder).                                                                                                                                                            |
| Code Linting                 | JavaScript code linting is done using [esLint](https://www.npmjs.com/package/gulp-eslint) - a linter tool for identifying and reporting on patterns in JavaScript (used airbnb-base rules https://www.npmjs.com/package/eslint-config-airbnb-base). HTML code hinting is done using [HtmlHint](https://www.npmjs.com/package/gulp-htmlhint). |
| ES2015(ES6) Support          | Optional ES2015 support .You can use all kind of ES6 features here. ES2015 source code will be automatically transpiled to ES5 for wide browser support.                                                                                                                                                                                     |
| HTML templating              | Used [pug](https://pugjs.org/api/getting-started.html).                                                                                                                                                                                                                                                                                      |
| Built-in HTTP Server         | A built-in server for previewing your site locally while you develop and iterate.                                                                                                                                                                                                                                                            |
| Live Browser Reloading       | Reload the browser in real-time anytime an edit is made without the need for an extension (Run `npm start` and edit your files).                                                                                                                                                                                                             |
| Cross-device Synchronization | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io) (Run `npm start` and open up the IP provided on other devices on your network).                                                                                                         |

## Overview

gulp-simple is an opinionated boilerplate for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

## Browser Support

At present, I officially aim to support the last two versions of the following browsers:

-   Chrome
-   Edge
-   Firefox
-   Safari
-   Internet Explorer

This is not to say that gulp-simple cannot be used in browsers older than those reflected, but merely that my focus will be on ensuring our layouts work great in the above.

## Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 4.0.x.
If you need to install Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.9.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

```sh
$ npm install --global gulp-cli
```

_This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges._

**In this project I use Gulp version 4.0**

### Local dependencies

Next, install the local dependencies gulp-simple requires:

```sh
$ npm install
```

or

```sh
$ npm i
```

That's it! You should now have everything needed to use the gulp-simple.

You may also want to get used to some of the [commands](#commands) available.

## Commands

There are many commands available to help you build and test sites. Here are a few highlights to get started with.

### Watch For Changes & Automatically Refresh Across Devices

## Build & Optimize

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [browsersync](https://browsersync.io/)
script will be automatically generated, which will take care of precaching your sites' resources.

```sh
$ npm start
```

## Serve the Fully Built & Optimized Site

```sh
$ npm build
```

`npm build` task creates the `production/` folder in the root of the project with **build files only**. It will **help you** to **create clear** instances of code for the **production** or **further implementation**.

## Structure

```
|-- src
|   |-- app
|   |   |-- components                # Reusable components
|   |   |   `-- header
|   |   |       |-- index.js          # Auto import to script main file when it created
|   |   |       |-- index.pug
|   |   |       |-- index.sass        # Auto import to sass main file when it created
|   |   |       `-- index.test.js
|   |   |-- scripts                   # Script main
|   |   |   `-- app.js
|   |   |-- styles
|   |   |   |-- common
|   |   |   |-- mixins
|   |   |   `-- main.sass             # Sass main
|   |   `-- views                     # Layout structure for app
|   |       |-- _layouts
|   |       `-- index.pug
|   `-- assets
|       |-- css                       # Custom css library
|       |-- fonts                     # Fonts
|       |-- img                       # Images
|       `-- js                        # Custom javascript library
|-- tasks                             # Folder for gulp tasks
|-- tmp                               # Folder for production build output, in development mode is tmp
|-- component.js                      # Creat component
|-- gulpfile.babel.js                 # gulp main
|-- karma.conf.js                     # karma test
|-- plugins.json                      # Import library css/js
`-- seo.json                          # Config SEO for website - build on production mode
```

## Gulp tasks

| Task        | Deciption                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| Easy start  | All setting of gulp task is in `config.json`                                                              |
| author      | This task will inject the config.author to css and javascript in production mode.                         |
| browserify  | Compile the `app.js`. It can only view files imported.                                                    |
| browserSync | Browsersync can watch your files as you work. Changes you make will eith                                  |
| clean       | `production` or `development` folder removing                                                             |
| concat      | Using `gulp-concat` to concat all library's css and javascript file to one single css and javascript file |
| done        | Notify that the `production` has been done. Will show on the log screen                                   |
| eslint      | Need to lint js files.                                                                                    |
| fonts       | Copy fonts.                                                                                               |
| images      | Copy images to `development` or `production` folder.                                                      |
| injectJs    | Automatic inject the js file in `components` folder to `app.js`.                                          |
| injectSass  | Automatic inject the sass file in `components` folder to sass main.                                       |
| pug         | Compile pug                                                                                               |
| rev         | Static asset revisioning by appending content hash to filenames unicorn.css → unicorn-d41d8cd98f.css      |
| sass        | Compile sass file                                                                                         |
| sitemap     | Make sitemap on `production` mode                                                                         |
| size        | Log file's size of the `production` folder                                                                |
| sprite      | Convert a set of images into a spritesheet and CSS variable                                               |
| size        | Zip the `production` folder                                                                               |

### To create new component

```bash

# format: node component.js [componentName] [add. expansion through the gap]

node component.js demoComponent # will create a index.pug, index.sass, index.js, index.test.js
```

## Troubleshooting

If you find yourself running into issues during installation or running the tools, open an issue. I would be happy to discuss how they can be solved.

## Author

👤 **ngocsangyem**

-   Github: [@ngocsangyem](https://github.com/ngocsangyem)

## Show your support

Give a ⭐️ if this project helped you!

## License

The MIT License (MIT)

Copyright (c) 2019 by ngocsangyem

The document get from [justcoded](https://github.com/justcoded)
