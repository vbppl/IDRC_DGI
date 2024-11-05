// Function to split a Google Form into three separate forms.
function splitFormIntoThree() {
  var originalForm = FormApp.getActiveForm();
  var items = originalForm.getItems();
  var sectionIndices = [];
  
  // Identify section breaks
  for (var i = 0; i < items.length; i++) {
    if (items[i].getType() == FormApp.ItemType.PAGE_BREAK) {
      sectionIndices.push(i);
    }
  }
  
  // Add an end index to process the last section
  sectionIndices.push(items.length);

  // Split into first form (Sections 1 to 5)
  createSubForm(originalForm, sectionIndices, 0, 5, "Form Part 1");

  // Split into second form (Sections 6 to 12)
  createSubForm(originalForm, sectionIndices, 5, 12, "Form Part 2");

  // Split into third form (Sections 13 to 22)
  createSubForm(originalForm, sectionIndices, 12, sectionIndices.length - 1, "Form Part 3");
}

function createSubForm(originalForm, sectionIndices, startSection, endSection, formName) {
  // Duplicate the form
  var newForm = DriveApp.getFileById(originalForm.getId()).makeCopy();
  var newFormId = newForm.getId();
  var newFormObj = FormApp.openById(newFormId);

  // Delete items outside the specified sections
  var currentItems = newFormObj.getItems();
  for (var i = currentItems.length - 1; i >= 0; i--) {
    var itemIndex = currentItems[i].getIndex();
    if (itemIndex < sectionIndices[startSection] || itemIndex >= sectionIndices[endSection]) {
      newFormObj.deleteItem(currentItems[i]);
    }
  }
  
  // Rename the new form
  newFormObj.setTitle(formName + ' - ' + originalForm.getTitle());

  Logger.log('Created new form: ' + newFormObj.getTitle());
}