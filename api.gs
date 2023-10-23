function doGet(req) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName('Sheet1');
  var values = sheet.getDataRange().getValues();

  // Skip the first row (header row) by slicing the array
  values = values.slice(1);

  var responseData = {
    data: values
  };

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}
