function convertDocToForm() {
    // Get the active document
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var paragraphs = body.getParagraphs();
    
    // Create a new Google Form
    var form = FormApp.create('Converted Form from Google Doc');
    
    var currentQuestion = null;           // Store the current question
    var multipleChoiceOptions = [];       // Store the multiple choice options
    var isInMultipleChoice = false;       // Flag to check if we're expecting options
    var questionCount = 1;                // Counter for numbering questions, start from 1
  
    paragraphs.forEach(function(paragraph) {
      var text = paragraph.getText();
      var paragraphType = paragraph.getType();
      
      // Check if the paragraph is a heading
      if (paragraphType == DocumentApp.ElementType.PARAGRAPH && paragraph.getHeading() != DocumentApp.ParagraphHeading.NORMAL) {
        // Add the heading as a new section in the form, convert to uppercase
        form.addSectionHeaderItem().setTitle(text.toUpperCase()); // Emphasize section title with uppercase and exclamations
      } else if (paragraphType == DocumentApp.ElementType.LIST_ITEM) {
        var listItem = paragraph.asListItem();
        var glyphType = listItem.getGlyphType();
        
        if (glyphType == DocumentApp.GlyphType.NUMBER) {
          // If there is a previous question, add it to the form
          if (currentQuestion) {
            if (multipleChoiceOptions.length > 0) {
              // Add as a multiple choice question if options exist
              form.addMultipleChoiceItem()
                  .setTitle(questionCount + ". " + currentQuestion) // Number the question
                  .setChoiceValues(multipleChoiceOptions);
            } else {
              // Otherwise, add as a short answer question
              form.addTextItem().setTitle(questionCount + ". " + currentQuestion); // Number the question
            }
            questionCount++; // Increment question count after adding the question
          }
          // Set the new question
          currentQuestion = text; // New numbered question
          multipleChoiceOptions = []; // Reset options for new question
          isInMultipleChoice = true; // Expecting options now
        } else if (glyphType == DocumentApp.GlyphType.BULLET) {
          // If it's a bullet point, capture as an option
          if (isInMultipleChoice && currentQuestion) {
            multipleChoiceOptions.push(text); // Add bullet point as option
          }
        }
      } else {
        // If it's not a list item and there are options collected, finalize the current question
        if (currentQuestion) {
          if (multipleChoiceOptions.length > 0) {
            // Add as a multiple choice if options exist
            form.addMultipleChoiceItem()
                .setTitle(questionCount + ". " + currentQuestion) // Number the question
                .setChoiceValues(multipleChoiceOptions);
          } else {
            // Otherwise, add as a text question
            form.addTextItem().setTitle(questionCount + ". " + currentQuestion); // Number the question
          }
          // Reset the current question and options
          currentQuestion = null;
          multipleChoiceOptions = [];
          isInMultipleChoice = false; // Reset expectation
          questionCount++; // Increment question count after adding the question
        }
      }
    });
    
    // Add the last question if it exists
    if (currentQuestion) {
      if (multipleChoiceOptions.length > 0) {
        form.addMultipleChoiceItem()
            .setTitle(questionCount + ". " + currentQuestion) // Number the question
            .setChoiceValues(multipleChoiceOptions);
      } else {
        form.addTextItem().setTitle(questionCount + ". " + currentQuestion); // Number the question
      }
    }
  }