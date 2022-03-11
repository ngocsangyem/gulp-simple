<h1 align="center">Welcome to gulp-simple 👋</h1>

> This repos is no longer supported. Please try the new version in [gulp-front](https://github.com/ngocsangyem/gulp-front)

-   [Overview](##overview)
-   [Features](##features)
-   [Browser Support](##browser)
-   [Prerequisites](##prerequisites)
-   [Setup](##setup)
-   [npm Workflow](##npm-workflow)
-   [Sub-Generators](##sub-generators)
-   [Troubleshooting](##troubleshooting)

## Overview

generator-ky is an opinionated generator for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

## Features

|                                                   | Available |
| ------------------------------------------------- | :-------: |
| [Browsersync](http://www.browsersync.io/)         |    ✅     |
| [Pug](https://pugjs.org/api/getting-started.html) |    ✅     |
| [Sass](https://sass-lang.com/)                    |    ✅     |
| [GulpV4](https://gulpjs.com/)                     |    ✅     |
| [Browserify](http://browserify.org/)              |    ✅     |
| [Webpack](https://webpack.js.org/)                |    ✅     |
| Optimize Images                                   |    ✅     |
| Minify Css and Javascript                         |    ✅     |
| Unit test                                         |    ✅     |
| Components                                        |    ✅     |
| SEO                                               |    ✅     |

## Browser

At present, I officially aim to support the last two versions of the following browsers:

-   Chrome
-   Edge
-   Firefox
-   Safari
-   Internet Explorer

This is not to say that gulp-simple cannot be used in browsers older than those reflected, but merely that my focus will be on ensuring our layouts work great in the above.

## Prerequisites

> NOTE: For OSX users You may have some issues compiling code during installation of packages. Please install Xcode from App Store first. After Xcode is installed, open Xcode and go to Preferences -> Download -> Command Line Tools -> Install to install command line tools.

> NOTE: For Windows users You may have some issues compiling BrowserSync during installation of packages. Please go to http://www.browsersync.io/docs/#windows-users for more information on how to get all the needed dependencies.

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 10.x.x.
If you need to install Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 4.x.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

```sh
$ npm install --global gulp-cli
```

_This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges._

## Setup

When starting a new project, you will want to: open up a terminal/command prompt, make a new directory, and navigate into it.

```
mkdir my-new-project && cd $_
```

then, run the Ky generator.

```
yo ky
```

**_Optionally_**, you can skip the automated installation of npm packages by passing in `--skip-install`. The main reason to use this is if you have spotty/no internet connection, but would still like to generate your project.

```
yo ky --skip-install
```

Follow all the prompts and choose what suits you most for the project you would like to create. When you finish with all of the prompts, your project scaffold will be created and all dependencies will be installed.

> NOTE: If you used the `--skip-install` option, no dependencies will have been installed and your gulp tasks will NOT work.
> You will need to run `npm install` in your project's root directory in order to get started running automated tasks

Once everything is installed, you will see a project structure like below:

```
|-- gulp
|   |-- helpers                             # Helpers function for task runner
|   |-- tasks                               #Folder for gulp tasks
|   |-- utils.js                            # Build related logic/code
|-- src
|   |-- app
|   |   |-- data                            # JSON/YAML files that add data to templates
|   |   |-- pages
|   |   |   |-- components                  # Components
|   |   |   |   |-- index.js                # Folder to export component's logic
|   |   |   |   |-- index.sass              # Folder to import component's style
|   |   |   |-- layouts
|   |   |   |   |-- _includes               # css, scripts, SEO, watermark, variables for template
|   |   |   |   |-- _mixins                 # Mixins for template (Bem,...)
|   |   |   |   |-- layout.pug              # Page layout
|   |   |   |-- views
|   |   |   |   |-- home                    # Page view
|   |   |   |   |-- index.js                # Folder to export View's logic
|   |   |   |   |-- index.sass              # Folder to import View's style
|   |   |   |-- index.js                    # Components's logic and Pages's logic in folder pages will be import here
|   |   |   |-- index.sass                  # Import views's sass and components's sass
|   |   |-- shared                          # Component that available on all pages will be created here
|   |   |   |-- components
|   |   |   |   |-- index.js
|   |   |   |   |-- index.sass
|   |   |   |-- helpers
|   |   |   |-- index.js
|   |   |   |-- index.sass
|   |   |-- styles                          # Global styles
|   |   |   |-- abstracts
|   |   |   |   |-- functions               # Helper function for mixins
|   |   |   |   |-- mixins                  # Mixins
|   |   |   |   |-- mixins.sass             # Import all mixins file
|   |   |   |-- base                        # Global file (breakpoint, global, typography, variables)
|   |   |   |-- index.sass                  # Import base and mixins
|   |   |-- main.js                         # Main bootstrap file
|   |   |-- main.sass                       # Main stylesheet (import everything to this file)
|   |-- assets
|       |-- css                             # Custom css library
|       |-- fonts                           # Fonts
|       |-- img                             # Image
|       |-- js                              # Custom javascript library
|-- config.json                             # Config directories, entries, ...
|-- gulpfile.babel.js                       # Gulp task configuration
|-- plugins.json                            # All css and javascript library will concat here
|-- seo.json                                # SEO folder
```

Now you can run the following npm scripts:

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [browsersync](https://browsersync.io/)
script will be automatically generated, which will take care of precaching your sites' resources.

```sh
$ npm start
```

Serve the Fully Built & Optimized Site. `npm run build` task creates the `build/` folder in the root of the project with **build files only**. It will **help you** to **create clear** instances of code for the **production** or **further implementation**.

```sh
npm run build

npm run serve:prod
```

### Configuration

In the `config.json` file, within the root of the generated project, you have the ability to configure some project settings:

#### Site

| Setting | Description                                      |
| ------- | ------------------------------------------------ |
| host    | Host URL of the development server (browserSync) |
| port    | Port of the development server (browserSync)     |
| baseUrl | Root directory of your site                      |

#### Main Directories

| Setting     | Description                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| source      | Source folder for all development files (default location for [page subgenerator](https://github.com/ngocsangyem/generator-ky#page)) |
| destination | Build folder where production version of site is generated                                                                           |
| temporary   | Temporary folder where development server files are generated                                                                        |

#### Source Directories

Folders relative to the `source` and `app` configured directory

| Setting   | Description                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data      | Data folder where JSON files are loaded into templates                                                                                                       |
| styles    | Styles folder where all stylesheet files are located (main stylesheet must be in root of this folder)                                                        |
| pages     | Pages folder where all reusable code should live (default location for [pages subgenerator](https://github.com/ngocsangyem/generator-ky#page))               |
| component | Componets folder where all reusable code should live (default location for [components subgenerator](https://github.com/ngocsangyem/generator-ky#component)) |
| assets    | Where all `img`, `fonts`, `custom css library`, `custom javascript library` files should live                                                                |

#### Entry files

Files that should be searched for and created by build tasks.
File strings and [Globs](https://github.com/isaacs/node-glob) can be used to process desired file(s).
Ex: `main**.js` will process all files that start with `main` and end with `.js`

| Setting | Description                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------- |
| script  | Tells browserify/webpack what file(s) to bundle and generate at your desired build target       |
| css     | Tells your stylesheet preprocessor (Sass) what file(s) to generate at your desired build target |

**_Default configuration:_**

```json
{
	"port": 9000,
	"baseUrl": "./",
	"entries": {
		"script": "main.js",
		"css": "main.+(sass|scss)",
		"dataJson": "data.json"
	},
	"directories": {
		"source": "src/",
		"app": "app/",
		"destination": "build",
		"temporary": "tmp",
		"component": "components/",
		"css": "styles/",
		"assets": "assets/",
		"scripts": "scripts/",
		"views": "views/",
		"images": "img/",
		"fonts": "fonts/",
		"data": "data/",
		"pages": "pages/",
		"shared": "shared/"
	},
	"author": {
		"name": "yem",
		"version": "v1.0.0",
		"link": "",
		"lincense": "MIT",
		"coding": "Coding by yem",
		"phone": "XXXXXXXXXX",
		"email": "yem@email.com"
	}
}
```

### Gulp tasks

| Task        | Deciption                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| Easy start  | All setting of gulp task is in `config.json`                                                              |
| author      | This task will inject the config.author to css and javascript in production mode.                         |
| browserify  | Compile the `main.js`. It can only view files imported.                                                   |
| browserSync | Browsersync can watch your files as you work. Changes you make will eith                                  |
| clean       | `production` or `development` folder removing                                                             |
| concat      | Using `gulp-concat` to concat all library's css and javascript file to one single css and javascript file |
| done        | Notify that the `production` has been done. Will show on the log screen                                   |
| eslint      | Need to lint js files.                                                                                    |
| fonts       | Copy fonts.                                                                                               |
| images      | Copy images to `development` or `production` folder.                                                      |
| pug         | Compile pug                                                                                               |
| rev         | Static asset revisioning by appending content hash to filenames unicorn.css → unicorn-d41d8cd98f.css      |
| sass        | Compile sass file                                                                                         |
| sitemap     | Make sitemap on `production` mode                                                                         |
| size        | Log file's size of the `production` folder                                                                |
| sprite      | Convert a set of images into a spritesheet and CSS variable                                               |
| size        | Zip the `production` folder                                                                               |

## npm Workflow

### `npm run build`

Runs [`npm run test`](#npm-test) and builds out an optimized site through compilation of preprocessors (Pug, Sass, etc), minification of CSS and HTML, uglification of Javascript, and optimization of images.

### `npm start`

Starts up a development server that watches files and automatically reloads them to the browser when a change is detected.

**Extra Task Target(s)**

| Tasks                | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `npm run serve:prod` | starts up a server that loads a production version of the site |
| `npm run start`      | starts up a server and opens it within your default browser    |

### `npm test`

Runs ESLint and Karma to lint and run JavaScript tests, respectively.

**Extra Task Target(s)**

| Tasks                     | Description                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm run test -- --watch` | runs [`npm run test`](#npm-test), but also watches test files and auto runs tests when changes are detected. |

> NOTE: test:watch is only available if you chose to unit test your javascript

**_Adding the `--debug` option to any npm script displays extra debugging information (ex. data being loaded into your templates)_**

## Sub-Generators

-   [ky:page](#page)
-   [ky:component](#component)

**_Note: Generators need to be run from the root directory of your app._**

## Default Generators

### Page

Creates a new page.

#### Example:

```
$ yo ky:page contact
```

Produces:

```sh
src/app/pages/views/contact/index.{pug}
```

`With custom path`

```
$ yo ky:page demo-page/about --custom
```

Produces:

```sh
src/app/demo-page/about/index.{pug}
```

### Component

Creates a new component.

#### Example:

```sh
$ yo ky:component pages/components/header
```

Produces:

```sh
src/app/pages/components/header/header.{pug}
src/app/pages/components/header/header.{scss,sass}
src/app/pages/components/header/header.js
src/app/pages/components/header/tests/header.test.js
```

## Troubleshooting

If you find yourself running into issues during installation or running the tools, open an issue. I would be happy to discuss how they can be solved.

## Author

👤 **ngocsangyem**

-   Github: [@ngocsangyem](https://github.com/ngocsangyem)

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT © [ngocsangyem](https://ngocsangyem.github.io/)
