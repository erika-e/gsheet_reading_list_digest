# gsheet_reading_list_digest
This javascript project integrates with a google sheet to generate a daily digest email from a backlog of links to read. 

## How to Get Started

This was designed to be used with no coding background! Follow the simple steps below to get started. 

1. Create a new google sheet with the gmail account you want to use for the emails 
2. Click on `Tools` > `Script Editor` 
3. Remove the blank myFunction function that is in the `Code.js` default file
4. Paste the entire contents of the `Code.js` file into the script editor
5. Use the drpodown just left of execution log to select the onOpen function and then click `Run`
6. When prompted, authorize the script
7. An execution log will pop up and tell you when the execution is complete
8. Click back over to your spreadsheet. A new menu, `Digest Menu`, will now appear.
9. Run the menu function `Run Initial Setup`

## How the Reading List Digest Works

Each day, the digest will email you a random number of articles between 1 and the max # you specified during setup. This takes the guesswork out of what to read when and encourages daily learning.

Articles stay on the backlog --and can show up in the digest -- until you update the date read and status columns.

The reading list has 3 sheets:
- ReadingList - where you add articles and can make notes on their content, quality, and category
- DataValidation - a helper sheet which encourages you to re-use categories and helps avoid typos when updating ReadingList
- ActivityData - like most people, I'm motivated by progress! This sheet will track and graph your articles read and the size of your backlog.

### Columns in the ReadingList Sheet 

The reading list sheet drives the update emails and allows you to categorize, rate, and manage your personalized digest content. 

| Column      | Use it to ...      | Column Required | Data Validation | 
| :---        | :---         | :---            | :--- |
| Source Link | Save the source of a link as a URL, for ex. a blog article or tweet.  | No | None |
| Link  | Store the URL to the content which will be sent in your digest email. | Yes | None | 
| Source | Categorize sources, e.g. email, twitter, a specific newsletter | ? | Self-Updating |
| Date Added | Note the date you added the article to the list. | Yes | 'MM-DD-YYYY' |  
| Date Read | Note the date you read the article. | Yes | 'MM-DD-YYYY' | 
| Category | Note the domain, field, or concept you associate the article with. Some examples from my list are DataScience, Talent, BestPractice, SQL etc | No | Self-Updating |
| Status | Mark articles as read. Any entry will prevent the article from appearing in a future digest. Exmaple statuses include Read, NotRead, Skimmed etc | No | Self-Updating |
| Quality | Rate article quality. | No | Integers 1-5 |
| Short Description | Enter some key words to describe the article or its content | No | None | 
| Comment | Make notes about the article, rating, category, etc. | No | None | 

#### Your date format sucks. Why didn't you use MyFavoriteFormat™? 
You're right, I should have handled date formats better. If you'd like to refactor the code to let the reader choose their date format, I'll happily accept your pull request. 🥳

### The DataValidation Sheet 
The data validation on the reading list is set up to be auto-maintaining. The DataValidation sheet uses `=SORT(UNIQUE(range))` on target columns in the reading list to maintain itself. The dropdowns on reading list reference the values created by this formula. 

I've found this is an easy way to maintain data validation lists. Periodically I'll need to go in and clean up values, for exmaple, `Data Science` vs. `DataScience`. I do this by using find and replace on the reading list.

The columns which have data validation are:
- Source
- Category
- Status 
- Quality

### The ActivityData Sheet
This sheet captures basic activity data. Like many other people, I'm motivated by a good upward trend.

It contains the follwing summaries:
| Summary | Contents | 
| :---        | :---  |
| Daily Added Counts | This is the count of articles added based on the date in the Date Added coulmn | 
| Daily Read Counts | This is the count of articles read based on the date in the Date Read column | 
| Data by Date | This calculates cumulative statistics by date and the total backlog |
| Data by Week | This calculates the same cumulative statistics by week |
