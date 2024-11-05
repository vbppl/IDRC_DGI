function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Script')
    .addItem('Update Cells with Identifier', 'updateCellsWithIdentifier')
    .addToUi();
}

function updateCellsWithIdentifier() {
  // Prompt the user to enter the Google Sheet ID
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt("Enter the Google Sheet ID", "Please enter the ID of the Google Sheet you want to modify:", ui.ButtonSet.OK_CANCEL);
  
  // Check if the user clicked "OK" and provided an ID
  if (response.getSelectedButton() == ui.Button.OK) {
    const sheetId = response.getResponseText().trim();
    
    // Validate if an ID was entered
    if (sheetId === "") {
      ui.alert("No ID entered. Please try again.");
      return;
    }

    // Open the spreadsheet with the provided ID
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    if (!spreadsheet) {
      ui.alert("Unable to open the spreadsheet. Please check the ID and try again.");
      return;
    }
    
    // Get the 'Identifier' sheet and its data
    const identifierSheet = spreadsheet.getSheetByName("Identifier");
    if (!identifierSheet) {
      ui.alert("The 'Identifier' sheet does not exist in this spreadsheet.");
      return;
    }
    
    // Fetch all data from the Identifier sheet
    const identifiers = identifierSheet.getDataRange().getValues();
    
    // Create a dictionary to store Word -> Identifier mappings
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
      
      // Get the header row of the current sheet
      const headers = values[0];
      
      // Identify columns that do not contain "Comments" in the header
      const validColumns = [];
      for (let col = 0; col < headers.length; col++) {
        if (!headers[col].toString().toLowerCase().includes("comments")) {
          validColumns.push(col);
        }
      }
      
      // Iterate over each cell and check if it matches a word, only in valid columns
      for (let row = 1; row < values.length; row++) { // Starting from row 1 to skip headers
        for (let col of validColumns) { // Process only valid columns
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
    ui.alert("Cells have been updated with corresponding identifiers, excluding 'Comments' columns.");
  } else {
    ui.alert("Operation canceled.");
  }
}