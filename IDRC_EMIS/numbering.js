function numberMultipleChoiceQuestions() {
  //var form = FormApp.openById('YOUR_FORM_ID'); // Replace with your Form ID
  var form = FormApp.getActiveForm();
  var items = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  
  var mainCounter = 1;  // Start the main counter at 1
  var subCounter = 0;   // Start the sub-counter at 0

  for (var i = 0; i < items.length; i++) {
    var item = items[i].asMultipleChoiceItem();
    var title = item.getTitle();

    if (subCounter === 0) {
      item.setTitle(mainCounter + ". " + title);
      subCounter++; // Move to the next sub-counter
    } else {
      item.setTitle(mainCounter + "." + subCounter + " " + title);
      subCounter = 0;  // Reset the sub-counter
      mainCounter++;   // Increment the main counter
    }
  }
}