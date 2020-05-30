function makechart() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('N2:T40').activate();
  var sheet = spreadsheet.getActiveSheet();
  var chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setPosition(31, 11, 26, 13)
  .build();
  sheet.insertChart(chart);
  var charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setPosition(29, 19, 48, 5)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setPosition(27, 21, 3, 1)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setPosition(18, 21, 3, 18)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setPosition(9, 21, 3, 19)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', false)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', false)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.2.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.2.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setYAxisTitle('A')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.2.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setYAxisTitle('R')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.2.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setYAxisTitle('Articles Read')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.2.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('N2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setYAxisTitle('Articles Read')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.title', 'Cumulative and Backlog Total')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('vAxes.1.titleTextStyle.color', '#000000')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.2.targetAxisIndex', 1)
  .setPosition(1, 21, 3, 14)
  .build();
  sheet.insertChart(chart);
};

function removeunneededseries() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('V1').activate();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('O2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('curveType', 'none')
  .setOption('domainAxis.direction', 1)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.fontName', 'Arial')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.fontName', 'Arial')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.fontName', 'Arial')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.fontName', 'Arial')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.fontName', 'Arial')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.fontName', 'Arial')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.title', 'Cumulative and Backlog Total')
  .setOption('vAxes.1.textStyle.fontName', 'Arial')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('vAxes.1.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.1.titleTextStyle.color', '#000000')
  .setOption('series.0.labelInLegend', 'Added')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.1.labelInLegend', 'Read')
  .setOption('series.2.targetAxisIndex', 1)
  .setOption('series.2.labelInLegend', 'Cumulative Added')
  .setOption('series.3.labelInLegend', 'Cumulative Read')
  .setOption('series.4.labelInLegend', 'Backlog')
  .setPosition(2, 21, 3, 12)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('O2:O40'))
  .addRange(spreadsheet.getRange('Q2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('curveType', 'none')
  .setOption('domainAxis.direction', 1)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.fontName', 'Arial')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.fontName', 'Arial')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.fontName', 'Arial')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.fontName', 'Arial')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.fontName', 'Arial')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.fontName', 'Arial')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.title', 'Cumulative and Backlog Total')
  .setOption('vAxes.1.textStyle.fontName', 'Arial')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('vAxes.1.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.1.titleTextStyle.color', '#000000')
  .setOption('series.0.labelInLegend', 'Read')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.1.labelInLegend', 'Cumulative Added')
  .setOption('series.2.targetAxisIndex', 1)
  .setOption('series.2.labelInLegend', 'Cumulative Read')
  .setOption('series.3.labelInLegend', 'Backlog')
  .setPosition(2, 21, 3, 12)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asComboChart()
  .addRange(spreadsheet.getRange('O2:O40'))
  .addRange(spreadsheet.getRange('Q2:Q40'))
  .addRange(spreadsheet.getRange('S2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('curveType', 'none')
  .setOption('domainAxis.direction', 1)
  .setOption('title', 'Weekly Reading Stats')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.fontName', 'Arial')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.fontName', 'Arial')
  .setOption('legend.textStyle.color', '#191919')
  .setOption('titleTextStyle.fontName', 'Arial')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.fontName', 'Arial')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.fontName', 'Arial')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.fontName', 'Arial')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setOption('vAxes.1.title', 'Cumulative and Backlog Total')
  .setOption('vAxes.1.textStyle.fontName', 'Arial')
  .setOption('vAxes.1.textStyle.color', '#000000')
  .setOption('vAxes.1.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.1.titleTextStyle.color', '#000000')
  .setOption('series.0.labelInLegend', 'Read')
  .setOption('series.1.targetAxisIndex', 1)
  .setOption('series.1.labelInLegend', 'Cumulative Read')
  .setOption('series.2.targetAxisIndex', 1)
  .setOption('series.2.labelInLegend', 'Backlog')
  .setPosition(2, 21, 3, 12)
  .build();
  sheet.insertChart(chart);
};