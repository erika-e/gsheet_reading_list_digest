function emailString() {
  
  var unreadArray = filterLinksArray(getArray());
  var maxLinks = linksToGet(3); // change number of emails here
  Logger.log(maxLinks)
  var arrayForEmail = [];
  
  //add a first or last entry to the reading list
  arrayForEmail.push(unreadArray[firstOrLast(unreadArray.length)])

  Logger.log(firstOrLast(unreadArray.length))
  
  //Add additional links up to maxLinks - 1
  for (i=1; i<=maxLinks-1; i++) {
    arrayForEmail.push(unreadArray[Math.round(Math.random() * unreadArray.length)]);
    }
  
  Logger.log(arrayForEmail.length)
  
  var string ="You have "+unreadArray.length+" reading list items unread \n" ;
  
  for (j=0; j<arrayForEmail.length; j++) {
    var string = string + "Spreadsheet row is " + arrayForEmail[j][12] + " and the source is: " + arrayForEmail[j][2] + " \n" + "Link is: " + arrayForEmail[j][1] + " " + arrayForEmail[j][0] +"\n" +"\n" ;
  }
  
  MailApp.sendEmail('erika.swartz@shawinc.com', "Digest with "+(maxLinks)+" to read",string)
  
}

function firstOrLast(unreadLength) {
  //use date to alternate between sending the first and latest item on the reading list
try {
  var today = new Date()
  
  if (today.getDate % 2 == 0)
  {
    return unreadLength
   }
  else {
    return 1
  }
} 
catch(ex){
  Logger.log(ex)
}
}

function test() {

  Logger.log(firstOrLast(200))

}



function linksToGet(max) {
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

function getArray() {
  // get the range of links represented in the reading list
  var listSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ReadingList')
  var listSheetData = listSheet.getDataRange() //use this function because getLastRow can get tricked by inconsistent lengths in first column
  var lastRow = listSheetData.getHeight()
  
  var linksArray = listSheet.getRange(2,1,lastRow, listSheet.getLastColumn()).getValues();  
  return linksArray ; 
}

function checkRead(value) {
  //return value.length >= 0; 
  
  //send links with blank status
  return value.length < 1 ;
};


function filterLinksArray(linksArray) {
  //this function takes an array containing list of links and filters the array on 
  //Column 7 reutrning all rows with no value in column 7

  try {
    var notReadArray = [];
    for (i=0; i<linksArray.length; i++) {
      //Logger.log(linksArray[i][7])
                  if (checkRead(linksArray[i][7])) {
                    var tempArray = linksArray[i] 
                    //Logger.log(tempArray)
                    tempArray.push(i+2) //this adds the spreadsheet row number from the original spreadsheet to the temp Array
                    notReadArray.push(tempArray)
                  }
      else {}
    }
    return notReadArray;
    
  }
  catch(Ex) {
    Logger.log(Ex)
  }
}
