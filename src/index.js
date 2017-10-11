var app = angular.module('app', ['ui.sortable','ui.router' , 'ngResource', 'ngMaterial' , 'pascalprecht.translate' ,'ngMdIcons' ]);
app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    "question":{
      "question" : "Question",
      "label_1" : "Label 1",
      "label_2" : "Label 2",
      "prompt"  :"Prompt",
      "option" : "Option",
      "item"  : "Item",
      "deleted" : "deleted",
      "added" : "added",
      "range" : "Range",
      "rating" : "Rating",
      "boolean" : "Boolean",
      "mcq" : "MCQ",
      "text" : "Text",
      "audio" : "Audio",
      "answer" : "Answer",
      "answerHere" : "Short answer text",
      "addOptions" : "Add Option",
      "questionnaire" : "EF Questionnaire",
      "questionnaires" : "Questionnaires",
      "saveForm" : "Save Form",
      "formName" : "Form name",
      "form" : "Form",
      "dropDown" : "Drop down",
      "selectOption" : "Select Option",
      "totalQuestions" : "Total Questions",
      "responseSubmitted" : "Response Submitted Successfully",
      "checkBox" : "Checkbox"

    },
    "data" : {
      "cannot_null":"{{name}} cannot be null",
      "charSize":"{{field}} must be unique",
      "specialChar":"Space, special characters, less than 3 and greater than 30 characters are not allowed in {{field}}",
      "specialWithSpaceChar":"{{field}} cannot have special characters",
    }
	,
	"generic" : {
		"delete" : "Delete",
		"view" : "View"
	}
  });


  $translateProvider.preferredLanguage('en');
}]);
