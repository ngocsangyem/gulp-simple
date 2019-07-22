<h1 align="center">Welcome to gulp-boilerplate 👋</h1>

[![gulp-boilerplate](https://img.shields.io/badge/version-2.0.0-orange.svg?cacheSeconds=2592000)](https://github.com/ngocsangyem/HTML-Build-Tool)
[![node](https://img.shields.io/badge/node-%3E%3D10.x.x-green.svg)](https://nodejs.org/en/)
[![gulp](https://img.shields.io/badge/gulp-4.0.0-red.svg)](https://gulpjs.com/)
![MIT license](https://img.shields.io/github/license/ngocsangyem/HTML-Build-Tool.svg)

## What new in 2.0.0?

-   Split task
-   Auto import sass file when create a new component
-   Auto delete page in build floder
-   Optimize js using webpack

## Overview

gulp-boilerplate is an opinionated boilerplate for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

## Browser Support

At present, i officially aim to support the last two versions of the following browsers:

-   Chrome
-   Edge
-   Firefox
-   Safari
-   Internet Explorer

This is not to say that gulp-boilerplate cannot be used in browsers older than those reflected, but merely that my focus will be on ensuring our layouts work great in the above.

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

_This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges._

**In this project i use Gulp version 4.0**

### Local dependencies

Next, install the local dependencies gulp-boilerplate requires:

```sh
$ npm install
```

or

```sh
$ npm i
```

That's it! You should now have everything needed to use the gulp-boilerplate.

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

`npm build` task creates the `production/` folder in the root of the project with **dist files only**. It will **help you** to **create clear** instances of code for the **production** or **further implementation**.

## Structure

```
|-- src
| |-- app
| | |-- components
| | | |-- footer
| | | | |-- index.js
| | | | |-- index.pug
| | | | `-- index.sass
| | |`-- header
| | | |-- index.js
| | | |-- index.pug
| | | `-- index.sass
| | |-- scripts
| | | |-- helper
| | | `-- app.js
| | |-- styles
| | | |-- common
| | | |-- mixins
| | |-- main.sass
| | -- views
| | |-- _layouts
| | | |-- _includes
| | | | |-- css.pug
| | | | |-- scripts.pug
| | | | |-- seo.pug
| | | | |-- variables.pug
| | | | |-- watermark.pug
| | | |-- \_mixins
| | | |-- layout.pug
| | |-- index.pug
| `-- assets
| |-- css
| | |-- fonts.css
| | |-- grid.css
| | |-- reset.css
| |-- fonts
| |-- img
| | -- sprite
| |-- js
|-- tasks
| |-- author.js
| |-- browserSync.js
| |-- browserify.js
| |-- clean.js
| |-- concat.js
| |-- done.js
| |-- eslint.js
| |-- fonts.js
| |-- images.js
| |-- injectJs.js
| |-- injectSass.js
| |-- pug.js
| |-- sass.js
| |-- sitemap.js
| |-- size.js
| |-- sprite.js
| |-- zip.js
|-- LICENSE
|-- README.md
|-- config.json
|-- gulpfile.babel.js
|-- package-lock.json
|-- package.json
|-- plugins.json`
|-- seo.json
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
