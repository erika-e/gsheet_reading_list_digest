function onOpen() {
  const menu = SpreadsheetApp.getUi().createMenu('Digest Menu');

  menu.addItem('Run Initial Setup','initialSetup')
    .addItem('Reset Digest Properties', 'setProperties')
    .addItem('Send Email Now', 'sendDigestEmail')
    .addToUi();
}

function setProperties() {
  //this function sets the script properties for access later
  //the email address it will use by default is the user's associated google acount
  //TODO add the triggers to this first menu
  PropertiesService.getScriptProperties().setProperty('url', SpreadsheetApp.getActiveSpreadsheet().getUrl());
  PropertiesService.getScriptProperties().setProperty('email', Session.getActiveUser().getEmail())
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
      'In the box below, enter the maximum number of articles you want to get in a single daily digest:',
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

function initialSetup() {
  //this function should call up a UI box and warn the user that it overwrites the script
   // Display a dialog box with a message and "Yes" and "No" buttons. The user can also close the
// dialog by clicking the close button in its title bar.
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('This will run the initial setup, which will overwrite all contents in the reading list. \n If you want to change your settings click no and run set properties. \n Are you sure you want to continue?', 
ui.ButtonSet.YES_NO);

// Process the user's response.
if (response == ui.Button.YES) {
  Logger.log('The user clicked "Yes."')
  setupDigest();
} else {
  Logger.log('The user clicked "No" or the close button in the dialog\'s title bar.')
}
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
  createDigestTriggers()

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

  const readingListData = [['https://veekaybee.github.io/2019/02/13/data-science-is-different/', 'Default', currentDateSerial()-1, currentDateSerial()-1, 'DataScience', 'Read', '', 'Data Science is Different Now'],
  ['https://counting.substack.com/p/data-cleaning-is-analysis-not-grunt', 'Default', currentDateSerial(), '', 'DataScience', '', '', 'Data Cleaning is Analysis, Not Grunt Work'],
  ['http://allendowney.blogspot.com/2013/08/are-my-data-normal.html', 'Default', currentDateSerial(), '', 'Statistics', '', '', 'Are Your Data Normal? Hint: no'],
  ['http://aimeets.design/design-challenges/', 'Default', currentDateSerial(), '', 'AI/ML', '', '', 'AI Design Toolkit w/ Ethics'],
  ['http://www.paulgraham.com/makersschedule.html', 'Default', currentDateSerial(), '', 'Frameworks', '', '', 'Makers Schedule, Managers Schedule'],
  ['https://hbr.org/2012/09/are-you-solving-the-right-problem', 'Default', currentDateSerial(), '', 'Frameworks', '', '', 'Solving the Right Problems'],
  ['https://www.alexandercowan.com/best-agile-user-story/', 'Default', currentDateSerial(), '', 'Agile', '', '', 'Agile User Stories'],
  ['https://technically.substack.com/p/whats-an-api', 'Default', currentDateSerial(), '', 'Software', '', '', 'What is an API?'],
  ['https://cultivating-algos.stitchfix.com/', 'Default', currentDateSerial(), '', 'Talent', '', '', 'Data Org Structure at Stitch Fix'],
  ['https://github.com/eugeneyan/applied-ml', 'Default', currentDateSerial(), '', 'AI/ML', '', '', 'ML in Production: Curated List'],
  ['https://github.com/dslp/dslp/blob/main/semantic-versioning.md', 'Default', currentDateSerial(), '', 'VersionControl', '', '', 'Semantic Versioning for Data Science Projects'],
  ['https://ryxcommar.com/2020/06/27/why-do-so-many-practicing-data-scientists-not-understand-logistic-regression/', 'Default', currentDateSerial(), '', 'DataScience', '', '', 'Logistic Regression'],
  ['https://public.tableau.com/views/SuperstoreDatePeriodComparisonKPIDashboard/DatePeriodComparisonKPIDashboard?:language=en&:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no#1', 'Default', currentDateSerial(), '', 'Tableau', '', '', 'Workbook with Date Range Comparison Examples'],
  ['https://jvns.ca/blog/good-questions/', 'Default', currentDateSerial(), '', 'Frameworks', '', '', 'How to Ask Good Questions'],
  ['http://mhawthorne.net/posts/2020-launching-in-the-dark/', 'Default', currentDateSerial(), '', 'Strategy', '', '', 'Launching in the Dark : You are an Aggregate of Your Partners'],
  ['https://blog.getdbt.com/there-is-no-such-thing-as-a-non-technical-data-analyst/', 'Default', currentDateSerial(), '', 'Talent', '', '', 'Analysts are Technical']];
  readingList.getRange('B2:I17').setValues(readingListData);
}

function currentDateSerial() {
  //this function returns the current date as a serial for populating the reading list
  start = new Date('1900-01-01')
  current_date = new Date();
  return Math.floor((current_date - start)/(1000*60*60*24)) + 2
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
  MailApp.sendEmail({
    to: getProperty('email'), 
    subject: "Daily Reading List Digest",
    htmlBody: makeEmailBody()
  })
}

function getRowUrl(row) {
  //modified from https://webapps.stackexchange.com/a/93307
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  var ss = SS.getActiveSheet();
  var url = '';
  url += SS.getUrl();
  url += '#gid=';
  url += ss.getSheetId(); 
  url += '&range=A';
  url += row;
  return url;
}

function format1DArray(inputArray) {
  var array = inputArray[0]
  return "<p>Spreadsheet row is <a href=\"" + getRowUrl(array[10]) + "\">" + array[10] + "</a> and the source is: " + array[2] + "<br>" + "Link: " + array[1] + "</p>"
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
    deleteTriggers();

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

function deleteTriggers(){
  var triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(function(trigger){

    try{
      ScriptApp.deleteTrigger(trigger);
    } catch(e) {
      throw e.message;
    };

    Utilities.sleep(1000);

  });

};
