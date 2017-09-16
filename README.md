freeboard-jqplot-buildtool
===============================

A tool that builds a freeboard-jqplot widget package directory into a dashboard.json file that can be loaded by freeboard.

The tool can update a widget's settings in a freeboard dashboard.json file.  Takes freeboard dashboard json as stdin, tries to read `data.js` and `chart-options.js`, `chart-settings.json`, and then serializes them into the dashboard json.

```
.
|____my-widget
| |____chart-options.js
| |____chart-settings.json
| |____data.js
| |____package.json
```

### Usage

Install tool as a dev dependency in your jqplot widget project folder (see [freeboard-jqplot-widget](https://github.com/jritsema/freeboard-jqplot-widget))...

`$ npm install --save-dev freeboard-jqplot-buildtool`

Then you can create an npm script to auto-update your dashboard.json with something like...

`$ cat dashboard.json | freeboard-jqplot-buildtool > temp && cp temp dashboard.json && rm temp`
