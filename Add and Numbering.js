// Function to add new question in a Google Form without there options and then number all.
function numberAndAddQuestionsWithOptions() {
    // Open the form
    //var formId = 'YOUR_FORM_ID';  // Replace with your form ID
    //var form = FormApp.openById(formId);
    var form = FormApp.getActiveForm();
    
    // Get all items in the form
    var items = form.getItems();
    
    var mainQuestionNumber = 1; // Initialize the main question number
    
    // Loop through each item and add a new question below it
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      
      // Skip if the item is a section or has no options
      if (item.getType() == FormApp.ItemType.PAGE_BREAK || item.getType() == FormApp.ItemType.SECTION_HEADER) {
        continue; // Skip section headers or page breaks
      }
  
      if (item.getType() != FormApp.ItemType.MULTIPLE_CHOICE &&
          item.getType() != FormApp.ItemType.CHECKBOX &&
          item.getType() != FormApp.ItemType.LIST) {
        continue; // Skip items that are not multiple choice, checkbox, or list
      }
      
      // Number the current question
      item.setTitle(mainQuestionNumber + ". " + item.getTitle());
      
      // Add a new Multiple Choice question below the current question
      var newItem = form.addMultipleChoiceItem()
                       .setTitle(mainQuestionNumber + ".1 " + 'Select level of involvement');
  
      // Add the choices
      newItem.setChoices([
        newItem.createChoice('School'),
        newItem.createChoice('Dzongkhag'),
        newItem.createChoice('Ministry')
      ]);
      
      // Move the new item just below the original
      form.moveItem(newItem.getIndex(), item.getIndex() + 1);
  
      // Increment the main question number
      mainQuestionNumber++;
    }
    
    Logger.log('Questions have been numbered and new questions added below each existing question.');
  }
