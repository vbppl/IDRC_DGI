function addLevelOfInvolvementQuestions() {
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  var multipleChoiceItems = [];
  
  // Collect the indices of the multiple-choice items
  for (var i = 0; i < items.length; i++) {
    if (items[i].getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
      multipleChoiceItems.push(i);
    }
  }

  // Add new multiple-choice questions and store their references
  var newQuestions = [];
  for (var i = 0; i < multipleChoiceItems.length; i++) {
    var oldQuestionNumber = (i + 1).toString(); // Old question numbering (1, 2, 3, ...)
    var newQuestionNumber = oldQuestionNumber + ".1"; // New question numbering (1.1, 2.1, 3.1, ...)
    
    // Get the title of the existing question and add the numbering
    var originalTitle = items[multipleChoiceItems[i]].getTitle();
    items[multipleChoiceItems[i]].setTitle(oldQuestionNumber + ". " + originalTitle);
    
    // Create the new question
    var newQuestion = form.addMultipleChoiceItem();
    newQuestion.setTitle(newQuestionNumber + ". Select level of involvement.");
    newQuestion.setChoiceValues(["School", "Dzongkhag", "Ministry"]);
    newQuestions.push(newQuestion);
  }

  // Insert the new questions after each original multiple-choice question
  for (var i = 0; i < multipleChoiceItems.length; i++) {
    form.moveItem(newQuestions[i].getIndex(), multipleChoiceItems[i] + i + 1);
  }
}