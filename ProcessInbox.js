//add old code here and start updating

//get an email thread from the Id list that matches the tweet pattern 
//parse the body to get a link to the tweet 
//parse the body to get a link to any content 
//write a row to the reading list backlog sheet 
//mark the email read 
//archive it 

function processInbox() {
    var threadIds = getEmailThreadIds(); 
     
     for (i=0; i<threadIds.length; i++) {
       //Logger.log(threadIds[i])
       processThread(threadIds[i]);
     }
     
   }
   
   function processThread(id) {
     //take a thread Id as an input and run the required functions to process it 
     //save links 
     //manage emails
     
     //get the links and the sheet 
     var linkArray = getLinkArrayFromThread(GmailApp.getThreadById(id)); 
     var readingListSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ReadingList'); 
     
     //write the links to the sheet 
     readingListSheet.getRange(readingListSheet.getLastRow()+1,1,1,4).setValues([linkArray]);
     
     //mark the email as read 
     GmailApp.getThreadById(id).markRead().moveToArchive();
     
   }
   
   
   function tester()
   {
     //no content id 
     var id = '16cda37a5f66c095'
     
     //content id 
     //var id='16d28205a358978a'
     
     var messages = GmailApp.getThreadById(id).getMessages()
     
     var body = messages[0].getBody() 
     
       var tweetRegex = new RegExp('<div><a href="https:\/\/twitter\.com\/.*\/status\/\\d*\\?s=\\d*"','m'); 
     var innerRegex = new RegExp('https:\/\/twitter\.com\/.*\/status\/\\d*\\?s=\\d*')
     var tweetLink = innerRegex.exec(tweetRegex.exec(body));
     
     var contentRegex = new RegExp('https:\/\/t\.co\/.{10}');
     var contentLink = contentRegex.exec(body); 
     
     if (contentLink === null) {
       var contentLink=""}
     else {
       var contentLink = contentLink[0];
     }
     
     var linkArray = [tweetLink[0], contentLink, "Twitter", messages[0].getDate()]; 
     
     Logger.log(linkArray)
     
     
   }
   
   
   function getLinksFromBody(body) {
     //extract the tweet link from the body 
     //extract the content link from the body 
     //package the links in an array 
     
     var tweetRegex = new RegExp('https:\/\/twitter\.com\/[A-Za-z0-9_]{4,15}\/status\/[0-9]*[?]{1}s=[0-9][0-9]'); 
     var tweetLink = tweetRegex.exec(body);
     
     var contentRegex = new RegExp('https:\/\/t\.co\/.{10}');
     var contentLink = contentRegex.exec(body);
     
     //test for a null content link
     if (contentLink === null) {
       var contentLink=""}
     else {
       var contentLink = contentLink[0];
     }
     
     var linkArray = [tweetLink[0], contentLink, "Twitter"];  
     
     return linkArray;
   }
   
   function getLinkArrayFromThread(thread) {
     //take a thread and return a tweet link 
     
     var messages = thread.getMessages() 
     var linkArray = getLinksFromBody(messages[0].getBody());
     
     linkArray.push(messages[0].getDate());
     
     return linkArray;
   }
   
   function getEmailThreadIds() {
     //return email threads whose subject starts with Tweet and Ends with On Twitter
     var threads = GmailApp.getInboxThreads();
     
     var threadIds = [];
     var regexpTwitter = new RegExp("Tweet.*Twitter");
     
     for (var i = 0; i < threads.length; i++) {
    
       if (regexpTwitter.test(threads[i].getFirstMessageSubject())) {
         threadIds.push(threads[i].getId());
       }
       else {}
   }
     //Logger.log(threadIds)
   return threadIds;
   }
   
   
   //function regexTester(){
   //  
   //  var messages = GmailApp.getThreadById('16d28205a358978a').getMessages();
   //  var body = messages[0].getBody();
   //  
   //  
   //  //16d2c90a7596bc93, 16d2a5e125b27a9e, 16d28205a358978a, 16d25783cdd8a0af, 16d1d719a1d4eb0c, 16cf9f2adb46e575, 16cda4ca47e313a6, 16cda37a5f66c095
   //  
   //  var tweetRegex = new RegExp('<div><a href="https:\/\/twitter\.com\/.*\/status\/\\d*\\?s=\\d*"','m'); 
   //  var innerRegex = new RegExp('https:\/\/twitter\.com\/.*\/status\/\\d*\\?s=\\d*')
   //  var tweetLink = innerRegex.exec(tweetRegex.exec(body));
   //  
   //  var contentRegex = new RegExp('https:\/\/t\.co\/.{10}');
   //  var contentLink = contentRegex.exec(body);
   //  
   //  Logger.log(tweetLink)
   //  Logger.log(contentLink)
   //  Logger.log(body)
   //  
   //}
   