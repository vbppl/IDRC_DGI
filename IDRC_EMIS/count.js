function countSections() {
  // Get the original form
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  var sectionIdxs = [];
  
  // Loop through all items to identify page breaks
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemType = item.getType();
    
    if (itemType == FormApp.ItemType.PAGE_BREAK) {
      sectionIdxs.push(item.getIndex());
    }
  }
  
  // The total number of sections is the number of page breaks plus one
  var totalSections = sectionIdxs.length + 1;
  
  Logger.log("Total number of sections: " + totalSections);
}