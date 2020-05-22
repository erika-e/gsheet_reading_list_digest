function onOpen(){
  var menu = SpreadsheetApp.getUi().createMenu('Digest Menu')
  
  menu.addItem('Run Setup', 'setupSheet')
  .addItem('Add template variable', 'addTemplateVariable')
  .addSeparator()
  .addItem('Copy Sheets', 'templateCopier')
  .addToUi(); 
}

function testCode()
{
 var test = getSetting("URL")
 
   var spreadsheet = SpreadsheetApp.openByUrl(getSetting("URL"))
   var data = spreadsheet.getSheetByName("RLT").getRange("B2:G17").getValues()
   
   Logger.log(data)
  
}

function setupSheets()
{
  //this set of commands creates the reading list sheets and preloads them with some links and formulas
  var spreadsheet = SpreadsheetApp.openByUrl(getSetting("URL"))
  spreadsheet.insertSheet("ReadingList")
  //spreadsheet.insertSheet("DataValidation")
  //spreadsheet.insertSheet("Reporting")
  
  setupReadingList(spreadsheet)
}

function setupDataValidation(spreadsheet)
{
  
}




function setupReadingList(spreadsheet){
  spreadsheet.getSheetByName("ReadingList")
  var readingListHeaders = [["Source Link", "Link", "Source", "Date Added", "Date Read", "Category", "Status", "Quality", "Short Description", "Comment" ]];
  spreadsheet.getSheetByName("ReadingList").getRange(1,1,1,10).setValues(readingListHeaders)
  
  var readingListData = [["https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091", "Email", "", "43768", "Strategy", "SendtoTeam"], ["https://towardsdatascience.com/everything-a-data-scientist-should-know-about-data-management-6877788c6a42", "Newsletter", "", "43822", "DataScience", "Read"], ["https://github.com/ml-tooling/ml-workspace/blob/develop/README.md?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_251", "Newsletter", "43725", "43828", "Tools", "Skimmed"], ["https://t.co/Rm6pr6IQMy", "Twitter", "43738.7330787037", "43826", "DataScience", "Read"], ["https://t.co/pE0zIVmRG5", "Twitter", "43740.759837963", "43845", "Coding", "Read"], ["https://t.co/ZEgBIO9G3e", "Twitter", "43743.8463657407", "43843", "Tools", "NotRead"], ["https://www.confluent.io/blog/every-company-is-becoming-software?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_253", "Newsletter", "43753", "43882", "DataArchitecture", "Read"], ["https://www.mckinsey.com/business-functions/mckinsey-analytics/our-insights/catch-them-if-you-can-how-leaders-in-data-and-analytics-have-pulled-ahead?utm_campaign=Data_Elixir&utm_medium=email&utm_source=Data_Elixir_253", "Newsletter", "43753", "43838", "Strategy", "Read"], ["https://medium.com/@uxpin/the-23-point-ux-design-checklist-45e8c4535806", "Social", "43755", "43850", "UX", "SendtoTeam"], ["https://about.gitlab.com/handbook/business-ops/data-team/#data-learning-and-resources", "Twitter", "43773", "", "Data", ""], ["https://mode.com/blog/design-systems-are-for-everyone?mkt_tok=eyJpIjoiTWpaaVpqRXlaRGRoT1dRMiIsInQiOiJxRlFmazZrbVlYYnp5bmYrR2FOcGd0YUIwcGJzR29kekYwb0ZFdVwvQUhpVEpieE1IdE9YMlM3K1dxTTRtdGdwOFVjXC8rdHdjTllyWTFQZW1jNGVCSFJNbk56WkxmeE5WZVpIeEZ1eDRPck9XSklCXC9Rek8xQU9TcjJQd3F6ZVNKSiJ9", "Newsletter", "43773", "", "BestPractice", ""], ["https://chrisachard.com/how-to-find-consulting-clients?mkt_tok=eyJpIjoiWlRaalpEZzVZek5rWkRZeCIsInQiOiI2OUlHekxuN2d6XC9QUzNMY3pTQnFLc09jQzRoZ0NyNTRZWFBFbzRma1ZXYUdpSERwMVpcL3o5Rmx6OWwxZFBXdU5VcUVhTTZpSTBCakI0bTRIQ2dYVmlHem9oYUt1TXBGOEpoK2puY0RLZ2kyTk9qUUhuYjhPQzViSU1rdVJXaENuIn0%3D", "Newsletter", "43782", "43838", "Consulting", "Read"], ["https://t.co/QXHLtGuq4R", "Twitter", "43788", "43825", "BestPractice", "Read"], ["https://www.mckinsey.com/featured-insights/artificial-intelligence/global-ai-survey-ai-proves-its-worth-but-few-scale-impact", "Newsletter", "43796", "", "AI/ML", ""], ["https://hbr.org/2012/09/are-you-solving-the-right-problem", "Research", "43818", "43836", "Frameworks", "Read"], ["https://towardsdatascience.com/all-machine-learning-models-explained-in-6-minutes-9fe30ff6776a", "Email", "43838", "43838", "AI/ML", "Read"]]
  spreadsheet.getSheetByName("ReadingList").getRange("B2:G17").setValues(readingListData)
  spreadsheet.getRange('D2:E17').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('M/d/yyyy');
  
}

function getSetting(setting)
{
//this function is used to declare key variables to get your digest script up and running
//I didn't optimize this script very well, so this process is manual 
//You'll need to do this before you do anything else

  var returnValue=""
  
switch(setting) 
 { 
   case "URL":
     //paste the URL of the spreadsheet you have created between the quotations
        returnValue="https://docs.google.com/spreadsheets/d/1N7AFvQ1mEVlmsHu1Am09lc77ISvIWGFNhN1pl1Tajog/"
        break; 
   case "digestMax":
     //this is the maximum number of links you can receive on any one day
        returnValue=3
        break;
   case "emailDestination":
     //this is the email address which will receive your digest email
        returnValue="erika.swartz@shawinc.com"
        break;
   default:
        Logger.log("no match to case statement")
        break; 
 }
  return returnValue 
    
} 