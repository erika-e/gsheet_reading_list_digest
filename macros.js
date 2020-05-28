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