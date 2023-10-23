function doGet(req) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName('Sheet1');
  var values = sheet.getDataRange().getValues();

  // Skip the first row (header row)
  values = values.slice(1);

  // Format date values to "dd-MM-yyyy" format
  for (var i = 0; i < values.length; i++) {
    values[i][0] = formatDate(values[i][0]);
  }

  var responseData = {
    data: values
  };

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to format the date to "dd-MM-yyyy" format
function formatDate(dateValue) {
  if (dateValue instanceof Date) {
    var day = dateValue.getDate();
    var month = dateValue.getMonth() + 1; // Months are 0-based
    var year = dateValue.getFullYear();
    
    return (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
  }
  
  // If the date is in ISO 8601 format, convert it to "dd-MM-yyyy"
  if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
    var date = new Date(dateValue);
    return formatDate(date);
  }
  
  return dateValue; // Return as is if not recognized
}
