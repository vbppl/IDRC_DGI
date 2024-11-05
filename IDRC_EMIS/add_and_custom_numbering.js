function addLevelOfInvolvementQuestions() {
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  var multipleChoiceItems = [];
  var startNumber = 131; // Starting number for the original questions
  
  // Collect the indices of the multiple-choice items
  for (var i = 0; i < items.length; i++) {
      if (items[i].getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
          multipleChoiceItems.push(i);
      }
  }

  // Add new multiple-choice questions and store their references
  var newQuestions = [];
  for (var i = 0; i < multipleChoiceItems.length; i++) {
      var oldQuestionNumber = (startNumber + i).toString(); // Old question numbering starts from n
      var newQuestionNumber = oldQuestionNumber + ".1"; // New question numbering (n.1, n+1, n+2.1, ...)
      
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