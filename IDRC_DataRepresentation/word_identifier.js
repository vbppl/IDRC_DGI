function updateCellsWithIdentifier() {
  // Get the active spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get the 'Identifier' sheet and its data
  const identifierSheet = spreadsheet.getSheetByName("Identifier");
  if (!identifierSheet) {
    SpreadsheetApp.getUi().alert("The 'Identifier' sheet does not exist.");
    return;
  }
  
  // Fetch all data from the Identifier sheet
  const identifiers = identifierSheet.getDataRange().getValues();
  
  // Create a dictionary to store Word -> Identifier mapping to corresponding word
  const wordToIdentifier = {};
  for (let i = 1; i < identifiers.length; i++) { // Skipping header row
    const word = identifiers[i][0];
    const identifier = identifiers[i][1];
    wordToIdentifier[word] = identifier;
  }
  
  // Loop through all sheets in the spreadsheet
  const sheets = spreadsheet.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    
    // Skip the Identifier sheet
    if (sheet.getName() === "Identifier") continue;
    
    // Get the range of data in the sheet
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    // Iterate over each cell and check if it matches a word
    for (let row = 0; row < values.length; row++) {
      for (let col = 0; col < values[row].length; col++) {
        const cellValue = values[row][col];
        
        // If the cell value matches a word in the dictionary, replace it with the identifier
        if (wordToIdentifier[cellValue] !== undefined) {
          values[row][col] = wordToIdentifier[cellValue];
        }
      }
    }
    
    // Set the modified values back to the sheet
    range.setValues(values);
  }
  
  // Notify user that the script has completed
  SpreadsheetApp.getUi().alert("Cells have been updated with corresponding identifiers.");
}