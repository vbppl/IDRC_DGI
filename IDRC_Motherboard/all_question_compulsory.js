function makeAllQuestionsRequired() {
  // Get the active form
  const form = FormApp.getActiveForm();
  
  // Get all items in the form
  const items = form.getItems();
  
  // Loop through each item and make it required based on type
  items.forEach(item => {
    switch (item.getType()) {
      case FormApp.ItemType.TEXT:
        item.asTextItem().setRequired(true);
        break;
      case FormApp.ItemType.MULTIPLE_CHOICE:
        item.asMultipleChoiceItem().setRequired(true);
        break;
      case FormApp.ItemType.CHECKBOX:
        item.asCheckboxItem().setRequired(true);
        break;
      case FormApp.ItemType.DROP_DOWN:
        item.asListItem().setRequired(true);
        break;
      case FormApp.ItemType.PARAGRAPH_TEXT:
        item.asParagraphTextItem().setRequired(true);
        break;
      case FormApp.ItemType.SCALE:
        item.asScaleItem().setRequired(true);
        break;
      case FormApp.ItemType.GRID:
        item.asGridItem().setRequired(true);
        break;
      case FormApp.ItemType.CHECKBOX_GRID:
        item.asCheckboxGridItem().setRequired(true);
        break;
      case FormApp.ItemType.DATE:
        item.asDateItem().setRequired(true);
        break;
      case FormApp.ItemType.TIME:
        item.asTimeItem().setRequired(true);
        break;
      default:
        // Skip items that do not support setting required (e.g., SECTION_HEADER, PAGE_BREAK)
        break;
    }
  });
  
  Logger.log("All questions have been set to required.");
}