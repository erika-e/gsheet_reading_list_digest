# gsheet_reading_list_digest
This javascript project integrates with a google sheet to generate a daily digest email from a backlog of links to read. 

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
