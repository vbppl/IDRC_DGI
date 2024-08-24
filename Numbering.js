// Function to number questions in a Google Form.
function numberQuestionsInForm() {
    // Open the form
    //var formId = 'YOUR_FORM_ID';  // Replace with your form ID
    //var form = FormApp.openById(formId);
    var form = FormApp.getActiveForm();
  
    // Get all items in the form
    var items = form.getItems();
    var questionNumber = 1;
  
    // Loop through each item and number the questions
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      
      // Skip sections
      if (item.getType() === FormApp.ItemType.PAGE_BREAK) {
        continue;
      }
  
      // Get the title of the question
      var title = item.getTitle();
  
      // Skip if the title starts with "A., B., C.," etc.
      if (title.match(/^[A-Z]\.\s/)) {
        continue;
      }
  
      // Number the question
      item.setTitle(questionNumber + ". " + title);
      questionNumber++;
    }
    
    Logger.log('Questions have been numbered.');
  }