function setProperties() {
  //this function sets the script properties for access later
  //the email address it will use by default is the user's associated google acount
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
  const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
  const readingList = spreadsheet.insertSheet('ReadingList')
  const dataValidation = spreadsheet.insertSheet('DataValidation');
  const activityData = spreadsheet.insertSheet('ActivityData')

  //populate sample reading list and data validation
  populateReadingList(readingList);
  populateDataValidation(dataValidation);
  //format and add data validation
  formatReadingList(readingList, dataValidation)
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

function populateActivityData() {
  const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
  const activityData = spreadsheet.getSheetByName('ActivityData')

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
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet() 
  const adt = spreadsheet.getSheetByName('ADT')
  
  const header_row = adt.getRange('A2').getFormulas() 
  
  for (i=0; i<=header_row[0].length - 1; i++) {
    header_row[0][i] = addQuotes(header_row[0][i])
  }
   Logger.log(header_row)
  
  
}

function addQuotes(value) {
  
  if (value.length = 0) {
   return "\'\'"
  }
  else {
   return "\'" + value + "\'" 
  }
}