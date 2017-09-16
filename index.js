#!/usr/bin/env node

'use strict';

var fs = require('fs');

process.stdin.setEncoding('utf8');

var dashboardJson = '';

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null)
    dashboardJson += chunk;
});

process.stdin.on('end', function() {

  //deserialize dashboard json
  var dashboard = JSON.parse(dashboardJson);

  //load package.json
  var packageJson = fs.readFileSync('./package.json', { encoding: 'utf8' });
  var widgetId = JSON.parse(packageJson).name;

  //find widget based on id
  var widget = findWidget(dashboard, widgetId);
  if (widget) {

    //read data.js
    var data = fs.readFileSync('./data.js', { encoding: 'utf8' });

    //read chart-options.js
    var chartOptions = fs.readFileSync('./chart-options.js', { encoding: 'utf8' });

    //read chart-settings.json
    var chartSettingsJson = fs.readFileSync('./chart-settings.json', { encoding: 'utf8' });
    var chartSettings = JSON.parse(chartSettingsJson);

    //update dashboard
    widget.settings.data = data;
    widget.settings.options = chartOptions;
    widget.settings.chartHeight = chartSettings.chartHeight;
    widget.settings.chartWidth = chartSettings.chartWidth;
    widget.settings.height = chartSettings.height;

    //serialize and write to stdout
    var newDashboardJson = JSON.stringify(dashboard, null, 2);
    console.log(newDashboardJson);
  }
  else
    throw 'Could not find widget in dashboard: ' + widgetId;

});

function findWidget(dashboard, widgetId) {
  for (var i in dashboard.panes) {
    var pane = dashboard.panes[i];
    for (var j in pane.widgets) {
      var widget = pane.widgets[j];
      if (widget.title && widget.title === widgetId)
        return widget;
    }
  }
}