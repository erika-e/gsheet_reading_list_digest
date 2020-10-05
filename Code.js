function setProperties() {
  //this function sets the script properties for access later
  //the email address it will use by default is the user's associated google acount
  //TODO add the triggers to this first menu
  PropertiesService.getScriptProperties().setProperty('url', SpreadsheetApp.getActiveSpreadsheet().getUrl());
  PropertiesService.getScriptProperties().setProperty('email', Session.getActiveUser().getEmail())
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
      'Running this function will overwrite everything in the readng list. \n Use set properties to change max links. \n Enter the max # of articles in a digest email:',
      ui.ButtonSet.OK);
  
  var maxLinks = result.getResponseText();
  PropertiesService.getScriptProperties().setProperty('maxLinks', maxLinks)
}

function getProperty(key) {
  // this function calls the property value back from the script properties by key
  // valid keys are 'url', 'maxLinks', and 'email'
  const returnValue = PropertiesService.getScriptProperties().getProperty(key)
  return returnValue;
  }

function onOpen() {
  const menu = SpreadsheetApp.getUi().createMenu('Digest Menu');

  menu.addItem('Run Initial Setup','setupDigest')
    .addItem('Reset Digest Properties', 'setProperties')
    .addItem('Add template variable', 'addTemplateVariable')
    .addSeparator()
    .addItem('Copy Sheets', 'templateCopier')
    .addToUi();
}

function setupDigest() {
  // this menu function sets up the digest for the first time
  //add popup to warn that this will reset everything
  setProperties()
  //const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
  const activityData = createSheetDeleteExisting('ActivityData')
  const dataValidation = createSheetDeleteExisting('DataValidation');
  const readingList = createSheetDeleteExisting('ReadingList')

  //populate sample reading list and data validation
  populateReadingList(readingList);
  populateDataValidation(dataValidation);
  populateActivityData(activityData);

  //format and add data validation
  formatReadingList(readingList, dataValidation)

  //create triggers 
  //add onOpen Trigger
  //add digest trigger daily 10 am

}

function createSheetDeleteExisting(name) {
//this function will delete an existing sheet if it exists, and replace it with a sheet of the same name

const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
const sheet = spreadsheet.getSheetByName(name)
if (sheet == null) {
  return spreadsheet.insertSheet(name)
}
else {
  spreadsheet.deleteSheet(spreadsheet.getSheetByName(name))
  return spreadsheet.insertSheet(name)
}

}

function populateDataValidation(dataValidation) {
  //this function populates the headers for the data validation
  //const dataValidation = spreadsheet.getSheetByName('DataValidation')

  //set headers 
  dataValidation.getRange("A1:D1").setValues([["Source", "Category", "Status", "Quality"]])
  //add data validation formulas 
  dataValidation.getRange("A2:C2").setFormulas([["=SORT(UNIQUE(ReadingList!C2:C),1,TRUE)", "=SORT(UNIQUE(ReadingList!F2:F),1,TRUE)", "=SORT(UNIQUE(ReadingList!G2:G),1,TRUE)"]])
  //add quality defaults
  dataValidation.getRange("D2:D6").setValues([[1.0], [2.0], [3.0], [4.0], [5.0]]).setNumberFormat("#")
}

function populateReadingList(readingList) {
  // this function populates the reading list with some sample content
  const readingListHeaders = [['Source Link', 'Link', 'Source', 'Date Added', 'Date Read', 'Category', 'Status', 'Quality', 'Short Description', 'Comment']];
  readingList.getRange(1, 1, 1, 10).setValues(readingListHeaders);

  const readingListData = [['https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091', 'Email', '', '43768', 'Strategy', 'SendtoTeam'], ['https://towardsdatascience.com/everything-a-data-scientist-should-know-about-data-management-6877788c6a42', 'Newsletter', '', '43822', 'DataScience', 'Read'], ['https://github.com/ml-tooling/ml-workspace/blob/develop/README.md?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_251', 'Newsletter', '43725', '43828', 'Tools', 'Skimmed'], ['https://t.co/Rm6pr6IQMy', 'Twitter', '43738.7330787037', '43826', 'DataScience', 'Read'], ['https://t.co/pE0zIVmRG5', 'Twitter', '43740.759837963', '43845', 'Coding', 'Read'], ['https://t.co/ZEgBIO9G3e', 'Twitter', '43743.8463657407', '43843', 'Tools', 'NotRead'], ['https://www.confluent.io/blog/every-company-is-becoming-software?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_253', 'Newsletter', '43753', '43882', 'DataArchitecture', 'Read'], ['https://www.mckinsey.com/business-functions/mckinsey-analytics/our-insights/catch-them-if-you-can-how-leaders-in-data-and-analytics-have-pulled-ahead?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_253', 'Newsletter', '43753', '43838', 'Strategy', 'Read'], ['https://medium.com/@uxpin/the-23-point-ux-design-checklist-45e8c4535806', 'Social', '43755', '43850', 'UX', 'SendtoTeam'], ['https://about.gitlab.com/handbook/business-ops/data-team/#data-learning-and-resources', 'Twitter', '43773', '', 'Data', ''], ['https://mode.com/blog/design-systems-are-for-everyone?mkt_tok=eyJpIjoiTWpaaVpqRXlaRGRoT1dRMiIsInQiOiJxRlFmazZrbVlYYnp5bmYrR2FOcGd0YUIwcGJzR29kekYwb0ZFdVwvQUhpVEpieE1IdE9YMlM3K1dxTTRtdGdwOFVjXC8rdHdjTllyWTFQZW1jNGVCSFJNbk56WkxmeE5WZVpIeEZ1eDRPck9XSklCXC9Rek8xQU9TcjJQd3F6ZVNKSiJ9', 'Newsletter', '43773', '', 'BestPractice', ''], ['https://chrisachard.com/how-to-find-consulting-clients?mkt_tok=eyJpIjoiWlRaalpEZzVZek5rWkRZeCIsInQiOiI2OUlHekxuN2d6XC9QUzNMY3pTQnFLc09jQzRoZ0NyNTRZWFBFbzRma1ZXYUdpSERwMVpcL3o5Rmx6OWwxZFBXdU5VcUVhTTZpSTBCakI0bTRIQ2dYVmlHem9oYUt1TXBGOEpoK2puY0RLZ2kyTk9qUUhuYjhPQzViSU1rdVJXaENuIn0%3D', 'Newsletter', '43782', '43838', 'Consulting', 'Read'], ['https://t.co/QXHLtGuq4R', 'Twitter', '43788', '43825', 'BestPractice', 'Read'], ['https://www.mckinsey.com/featured-insights/artificial-intelligence/global-ai-survey-ai-proves-its-worth-but-few-scale-impact', 'Newsletter', '43796', '', 'AI/ML', ''], ['https://hbr.org/2012/09/are-you-solving-the-right-problem', 'Research', '43818', '43836', 'Frameworks', 'Read'], ['https://towardsdatascience.com/all-machine-learning-models-explained-in-6-minutes-9fe30ff6776a', 'Email', '43838', '43838', 'AI/ML', 'Read']];
  readingList.getRange('B2:G17').setValues(readingListData);
} 

function populateActivityData(activityData) {
  //set header row data
  activityData.getRange('A1:N1').setValues([['Daily Added Counts', '', 'Daily Read Counts', '', '', 'Data By Date', '', '', '', '', '', '', '', 'Data By Week']])

  //add secondary headers
  activityData.getRange('F2:L2').setValues([['Date', 'Week-Year', 'Added', 'Read', 'Cumulative Added', 'Cumulative Read', 'Backlog']])

  //set the fprmulas
  activityData.getRange('A2').setFormulas([['=QUERY(ReadingList!A:J, "SELECT TODATE(D), COUNT(B) WHERE TODATE(D) IS NOT NULL GROUP BY TODATE(D) LABEL TODATE(D) \'Date\', COUNT(B) \'Number Added\' " )']])
  activityData.getRange('C2').setFormulas([['=QUERY(ReadingList!A:J, "SELECT TODATE(E), COUNT(B) WHERE TODATE(E) IS NOT NULL GROUP BY TODATE(E) LABEL TODATE(E) \'Date\', COUNT(B) \'Number Read\' " )']])
  activityData.getRange('N2').setFormulas([['=QUERY(F3:L, "SELECT G, MIN(F), SUM(H), SUM(I), MAX(J), MAX(K), MAX(L) WHERE G IS NOT NULL GROUP BY G ORDER BY MIN(F) ASC LABEL G \'Week-Year\', MIN(F) \'Week Start\', SUM(H) \'Added\', SUM(I) \'Read\', MAX(J) \'Cumulative Added\', MAX(K) \'Cumulative Read\', MAX(L) \'Backlog\'")']])
  activityData.getRange('F3:L3').setFormulas([['=MIN(A3:A)', '=IF(NOT(ISBLANK(F3)),CONCATENATE(IF(LEN(WEEKNUM(F3))<2,CONCATENATE("0",WEEKNUM(F3)),TO_TEXT(WEEKNUM(F3))), "-", TO_TEXT(YEAR(F3))),"")', '=ARRAYFORMULA(IF(NOT(ISBLANK(F3:F)),IFERROR(VLOOKUP(F3:F,$A$3:B,2,FALSE),0),""))', '=ARRAYFORMULA(IF(NOT(ISBLANK(F3:F)),IFERROR(VLOOKUP(F3:F,$C$3:D,2,FALSE),0),""))', '=IF(LEN(H3)>0,SUM($H$3:H3),"")', '=IF(LEN(H3)>0,SUM($I$3:I3),"")', '=IF(LEN(H3)>0,J3-K3,"")']])
  activityData.getRange('F4').setFormulas([['=ARRAYFORMULA(ADD(F3,ROW(INDIRECT("A1:A"&INT(NOW()-F3)))))']])

  //autofill formulas down the sheet 
  activityData.getRange('G3').autoFill(activityData.getRange('G3:G'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  activityData.getRange('J3:L3').autoFill(activityData.getRange('J3:L'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

  //create the chart of the data 
  addChart(activityData)
}

function addChart(activityData) {
  //add a chart using the weekly data

  var chart = activityData.newChart()
  .asComboChart()
  .addRange(activityData.getRange('O2:O40'))
  .addRange(activityData.getRange('Q2:Q40'))
  .addRange(activityData.getRange('S2:T40'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(-1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setYAxisTitle('Articles Read')
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
  .setOption('vAxes.0.title', 'Articles Read')
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
  .setPosition(2, 21, 3, 2)
  .build();
  activityData.insertChart(chart);
}

function formatReadingList(readingList, dataValidation) {
  //this function adds formatting and data validation to the reading list 

  //format the date column
  readingList.getRange('D2:E').setNumberFormat("MM/DD/YYYY")

  //populate data validation columns
  addDataValidation(readingList, dataValidation, 'C2:C', 'A2:A');
  addDataValidation(readingList, dataValidation, 'F2:F', 'B2:B');
  addDataValidation(readingList, dataValidation, 'G2:G', 'C2:C');
  addDataValidation(readingList, dataValidation, 'H2:H', 'D2:D6');
}

function addDataValidation(targetSheet, sourceSheet, targetA1, sourceA1) {
  //use the specified ranges and sheets to configure data validation with a drop down menu
  targetSheet.getRange(targetA1).setDataValidation(SpreadsheetApp.newDataValidation()
  .setAllowInvalid(true)
  .requireValueInRange(sourceSheet.getRange(sourceA1),true)
  .build())
}

function logActivity()
{
  //this function is used to scrape template sheets for strings describing cell content or formulas
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet() 
  const adt = spreadsheet.getSheetByName('ADT')
  
  const header_row = adt.getRange('A2').getFormulas() 
  
  for (i=0; i<=header_row[0].length - 1; i++) {
    header_row[0][i] = addQuotes(header_row[0][i])
  }
   Logger.log(header_row)
}

function addQuotes(value) {
  //this is a helper function that adds quotes or creates empty strings
  if (value.length = 0) {
   return "\'\'"
  }
  else {
   return "\'" + value + "\'" 
  }
}

function getReadingListContents() {
  //return an array of the reading list contents
  //add a column with the row index to the array

  var listSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ReadingList')
  var listSheetData = listSheet.getDataRange() //use this function because getLastRow can get tricked by inconsistent lengths in first column
  var lastRow = listSheetData.getHeight() - 1

  //Logger.log(listSheet.getLastColumn()) width of array is 10

  var contentArray = listSheet.getRange(2,1,lastRow, listSheet.getLastColumn()).getValues();

  //attempt to add an index without for loop, is that supported in apps script now?
  //https://www.javascripttutorial.net/javascript-multidimensional-array/

  contentArray.forEach((contentItem, index) => {
    //add an index / row number so that once the array is filtered the row can still be sent in the digest
    contentItem[10] = index+2
  });
  
  return contentArray
}

function filterContents() {
  //get the unread contents of the reading list
  contentArray = getReadingListContents()
  unreadArray = contentArray.filter(contentItem => contentItem[6] === "")
  return unreadArray
}

function makeDigestArray(unreadArray) {
  //create the digest array of rows from unreadArray that will be sent this time

  //apply the first or last logic ... on odd days, oldest entry is sent, on even, latest
  digestArray = []
  digestArray.push(unreadArray.splice(firstLast(unreadArray.length),1))

  //get the number of additional links to send with a random number of additional links
  var digestLinks = testCondition(unreadArray,randomizeDigestLinks(getProperty('maxLinks'))) - 1

  //Add additional links up to digestLinks
    for (i=1; i<=digestLinks; i++) {
      digestArray.push(unreadArray.splice(Math.round(Math.random() * unreadArray.length),1));
      }
 
 return digestArray
}

function makeEmailBody() {
  //checks length of unread array 
  //calls makeDigestArray if reading list is long enough 
  //returns a string that is the email body
  var unreadArray = filterContents() 

  if (unreadArray.length != 0)
  {
    var digestArray = makeDigestArray(unreadArray)

    string = ""
    for (j=0; j<digestArray.length; j++) {
      var string = string + format1DArray(digestArray[j])
    }
    return string

  }
  else {
    return "No unread articles! Go find some more cool stuff to read!"
  }
}

function sendDigestEmail() {
  //send the email to the specified address
  MailApp.sendEmail(getProperty('email'), "Daily Reading List Digest",makeEmailBody())

}

function format1DArray(inputArray) {
  var array = inputArray[0]
  return "Spreadsheet row is " + array[10] + " and the source is: " + array[2] + " \n " + "Link: " + array[1] + "\n" + "\n"
}

function testCondition(unreadArray, digestLinks) {
//make sure unread array has enough links for the digest 
if (unreadArray.length < digestLinks) {
  return unreadArray.length }
  else
  {
  return digestLinks
  }
}

function firstLast(arrayLen) {
  //use date to alternate between sending the first and latest item on the reading list
  
  var today = new Date()
  
  if ((today.getDate() % 2) == 0.0)
  {
    return (arrayLen - 1)
   }
  else {
    return 0
  }
} 

function randomizeDigestLinks(max) {
 // use a random number genereator to get up to max links
  try{
  var linkNum = Math.round(Math.random() * (max-1))+1;
  //Logger.log(linkNum)
  return linkNum
  } 
  
  catch(ex) {
    Logger.log(ex)
  }
}

function createDigestTriggers() {
    var ss = SpreadsheetApp.getActive();
    ScriptApp.newTrigger('onOpen')
        .forSpreadsheet(ss)
        .onOpen()
        .create();
    
    ScriptApp.newTrigger('sendDigestEmail')
        .timeBased()
        .everyDays(1)
        .atHour(9)
        .create();

}
