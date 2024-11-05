function splitForm() {
  // Get the original form
  var originalForm = FormApp.getActiveForm();

  // Get the number of sections in the original form
  var sectionCount = originalForm.getSections().length;

  // Prompt the user for the number of split forms
  var splitForms = Browser.inputBox("Split into how many forms?", Browser.Buttons.OK_CANCEL);

  // If the user cancelled, exit the function
  if (splitForms == null) {
    return;
  }

  // Create an array to store the split forms
  var splitFormsArray = [];

  // Iterate over the split forms
  for (var i = 1; i <= splitForms; i++) {
    // Create a new form
    var newForm = FormApp.create("Split Form " + i);

    // Add the new form to the array
    splitFormsArray.push(newForm);
  }

  // Prompt the user to assign sections to each split form
  for (var i = 0; i < splitForms; i++) {
    var sectionsToAssign = Browser.inputBox("Sections for Split Form " + (i + 1), Browser.Buttons.OK_CANCEL);

    // If the user cancelled, exit the loop
    if (sectionsToAssign == null) {
      continue;
    }

    // Split the input into an array of section numbers
    var sectionNumbers = sectionsToAssign.split(",");

    // Iterate over the section numbers and assign the sections
    for (var j = 0; j < sectionNumbers.length; j++) {
      var sectionIndex = parseInt(sectionNumbers[j]) - 1; // Adjust for 0-based indexing
      if (sectionIndex >= 0 && sectionIndex < sectionCount) {
        var section = originalForm.getSections()[sectionIndex];
        splitFormsArray[i].addSection(section.copy());
      } else {
        Browser.msgBox("Invalid section number: " + sectionNumbers[j]);
      }
    }
  }
}