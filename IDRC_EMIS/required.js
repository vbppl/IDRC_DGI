function makeMultipleChoiceQuestionsMandatory() {
  // Open the Google Form using its ID
  var form = FormApp.getActiveForm();
  
  // Get all the items (questions) in the form
  var items = form.getItems();
  
  // Loop through each item
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    
    // Check if the item is a multiple-choice question
    if (item.getType() == FormApp.ItemType.MULTIPLE_CHOICE) {
      // Set the multiple-choice question to required
      item.asMultipleChoiceItem().setRequired(true);
    }
  }
}