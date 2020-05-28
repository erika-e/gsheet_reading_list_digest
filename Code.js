function setProperties() {
  //this function sets the script properties for access later
  //the email address it will use by default is the user's associated google acount
  PropertiesService.getScriptProperties().setProperty('url', SpreadsheetApp.getActiveSpreadsheet().getUrl());
  PropertiesService.getScriptProperties().setProperty('email', Session.getActiveUser().getEmail())
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
      'Enter the max # of articles in a digest email:',
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


  setProperties()
  const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
  spreadsheet.insertSheet('ReadingList');
  setupReadingList(spreadsheet);
}

function setupDataValidation(spreadsheet) {

}

function setupDataValidation() {
  const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
  spreadsheet.insertSheet('DataValidation');
  const dataValidation = spreadsheet.getSheetByName('DataValidation')

  //set headers 
  dataValidation.getRange("A1:D1").setValues([["Source", "Category", "Status", "Quality"]])
  //add data validation formulas 
  dataValidation.getRange("A2:C2").setFormulas([["=SORT(UNIQUE(ReadingList!C2:C),1,TRUE)", "=SORT(UNIQUE(ReadingList!F2:F),1,TRUE)", "=SORT(UNIQUE(ReadingList!G2:G),1,TRUE)"]])
  //add quality defaults
  dataValidation.getRange("D2:D6").setValues([[1], [2], [3], [4], [5]])
}

function logDataValidation(){
  const spreadsheet = SpreadsheetApp.openByUrl(getProperty('url'))
  
  headers = spreadsheet.getSheetByName('DataValidation').getRange("A1:D1").getValues()
  Logger.log(headers)
  
  formulas = spreadsheet.getSheetByName('DataValidation').getRange("A2:C2").getFormulas()
  Logger.log(formulas)
  
  quality = spreadsheet.getSheetByName('DataValidation').getRange("D2:D6").getValues()
  Logger.log(quality)
}


function setupReadingList(spreadsheet) {
  spreadsheet.getSheetByName('ReadingList');
  const readingListHeaders = [['Source Link', 'Link', 'Source', 'Date Added', 'Date Read', 'Category', 'Status', 'Quality', 'Short Description', 'Comment']];
  spreadsheet.getSheetByName('ReadingList').getRange(1, 1, 1, 10).setValues(readingListHeaders);

  const readingListData = [['https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091', 'Email', '', '43768', 'Strategy', 'SendtoTeam'], ['https://towardsdatascience.com/everything-a-data-scientist-should-know-about-data-management-6877788c6a42', 'Newsletter', '', '43822', 'DataScience', 'Read'], ['https://github.com/ml-tooling/ml-workspace/blob/develop/README.md?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_251', 'Newsletter', '43725', '43828', 'Tools', 'Skimmed'], ['https://t.co/Rm6pr6IQMy', 'Twitter', '43738.7330787037', '43826', 'DataScience', 'Read'], ['https://t.co/pE0zIVmRG5', 'Twitter', '43740.759837963', '43845', 'Coding', 'Read'], ['https://t.co/ZEgBIO9G3e', 'Twitter', '43743.8463657407', '43843', 'Tools', 'NotRead'], ['https://www.confluent.io/blog/every-company-is-becoming-software?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_253', 'Newsletter', '43753', '43882', 'DataArchitecture', 'Read'], ['https://www.mckinsey.com/business-functions/mckinsey-analytics/our-insights/catch-them-if-you-can-how-leaders-in-data-and-analytics-have-pulled-ahead?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_253', 'Newsletter', '43753', '43838', 'Strategy', 'Read'], ['https://medium.com/@uxpin/the-23-point-ux-design-checklist-45e8c4535806', 'Social', '43755', '43850', 'UX', 'SendtoTeam'], ['https://about.gitlab.com/handbook/business-ops/data-team/#data-learning-and-resources', 'Twitter', '43773', '', 'Data', ''], ['https://mode.com/blog/design-systems-are-for-everyone?mkt_tok=eyJpIjoiTWpaaVpqRXlaRGRoT1dRMiIsInQiOiJxRlFmazZrbVlYYnp5bmYrR2FOcGd0YUIwcGJzR29kekYwb0ZFdVwvQUhpVEpieE1IdE9YMlM3K1dxTTRtdGdwOFVjXC8rdHdjTllyWTFQZW1jNGVCSFJNbk56WkxmeE5WZVpIeEZ1eDRPck9XSklCXC9Rek8xQU9TcjJQd3F6ZVNKSiJ9', 'Newsletter', '43773', '', 'BestPractice', ''], ['https://chrisachard.com/how-to-find-consulting-clients?mkt_tok=eyJpIjoiWlRaalpEZzVZek5rWkRZeCIsInQiOiI2OUlHekxuN2d6XC9QUzNMY3pTQnFLc09jQzRoZ0NyNTRZWFBFbzRma1ZXYUdpSERwMVpcL3o5Rmx6OWwxZFBXdU5VcUVhTTZpSTBCakI0bTRIQ2dYVmlHem9oYUt1TXBGOEpoK2puY0RLZ2kyTk9qUUhuYjhPQzViSU1rdVJXaENuIn0%3D', 'Newsletter', '43782', '43838', 'Consulting', 'Read'], ['https://t.co/QXHLtGuq4R', 'Twitter', '43788', '43825', 'BestPractice', 'Read'], ['https://www.mckinsey.com/featured-insights/artificial-intelligence/global-ai-survey-ai-proves-its-worth-but-few-scale-impact', 'Newsletter', '43796', '', 'AI/ML', ''], ['https://hbr.org/2012/09/are-you-solving-the-right-problem', 'Research', '43818', '43836', 'Frameworks', 'Read'], ['https://towardsdatascience.com/all-machine-learning-models-explained-in-6-minutes-9fe30ff6776a', 'Email', '43838', '43838', 'AI/ML', 'Read']];
  spreadsheet.getSheetByName('ReadingList').getRange('B2:G17').setValues(readingListData);
  spreadsheet.getRange('D2:E17').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('M/d/yyyy');
}


function AddDataValidation() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E4').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('ReadingList'), true);
  spreadsheet.getRange('B2:B22').activate();
  spreadsheet.getRange('ReadingList!F2:F1000').setDataValidation(SpreadsheetApp.newDataValidation()
  .setAllowInvalid(true)
  .requireValueInRange(spreadsheet.getRange('\'Data Validation - Temp Template\'!$B$2:$B$22'), true)
  .build());
};
