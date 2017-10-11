angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: function (questionnaireService,$mdSidenav, $mdDialog) {
		var vm = this ;

    vm.hidden = false;
    vm.isOpen = false;
    vm.create =  create;
    vm.hover = true;
    vm.selectedDiv = false;
    vm.selectedMode = 'md-fling';
    vm.formId = 0;
    vm.dragStart = dragStart;
    vm.turnActive = turnActive;
    vm.createOrEdit="";
    vm.isSelected = isSelected;
    //vm.submitResponse = submitResponse;
    vm.deleteQuestion = deleteQuestion;
    vm.formName = "";
    vm.guideDescription = "";
    vm.questionnaireList = [];
    vm.rangeTypeQuestionsList = [];
    vm.mcqTypeQuestionsList = [];
    vm.textTypeQuestionsList = [];
    vm.audioTypeQuestionsList = [];
    vm.allQuestionsList = [];
    vm.files = [];
    vm.index = 0;
    vm.isSaved = true;
    vm.glued = false;
    vm.ranges = [{value : 0 , "range" : "0-9" }, {value : 1 ,"range" : "1-5"}];
    vm.removeOption = removeOption;
    vm.options = [{"optionId" :"option_1", "optionText" : "" }];
   // vm.loadPrompts = loadPrompts;
    getQuestionnaireList();

    vm.addRangeTypeQuestion = addRangeTypeQuestion;
    vm.addMCQTypeQuestion = addMCQTypeQuestion;
    vm.addTextTypeQuestion = addTextTypeQuestion;
    vm.addAudioTypeQuestion = addAudioTypeQuestion;
    vm.addCheckBoxTypeQuestion = addCheckBoxTypeQuestion;
    vm.addDropdownTypeQuestion = addDropdownTypeQuestion;
    vm.addMoreOptions = addMoreOptions;
    vm.getQuestionnaireList = getQuestionnaireList;
    vm.showQuestionnaire = showQuestionnaire;
    vm.closeDialog = closeDialog;
    vm.saveDialog = saveDialog;
    vm.previewQuestionnaire = previewQuestionnaire;
    vm.disableOrder = "moved";
    vm.deleteQuestionnaire = deleteQuestionnaire;
    vm.saveQuestionnaireDialog = saveQuestionnaireDialog;
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
    function addRangeTypeQuestion(){
      vm.isSaved = true;
      var question = {"type" : "rating" ,"question" : {"text" : "" , "label_1" :"", "label_2" : "" ,"required" :false}};
      vm.allQuestionsList.push(question);
      vm.glued = true;
      vm.turnActive(question);

    }
    function addMCQTypeQuestion(){
      vm.isSaved = true;
      var question = {"type" : "mcq", "question" : {"text" : "", "options" : [{"optionId" : "option_1" , "optionText":""}] ,"required" :false}};
      vm.allQuestionsList.push(question);
      vm.glued = true;

      vm.turnActive(question);
       console.log(vm.allQuestionsList)
    }
    function addDropdownTypeQuestion(){
      vm.isSaved = true;
      var question = {"type" : "dropDown", "question" : {"text" : "", "options" : [{"optionId" : "option_1" , "optionText":""}] ,"required" :false}};
      vm.allQuestionsList.push(question);
      vm.glued = true;

      vm.turnActive(question);
       console.log(vm.allQuestionsList)
    }
    function addCheckBoxTypeQuestion(){
      vm.isSaved = true;
      var question = {"type" : "checkBox", "question" : {"text" : "", "options" : [{"optionId" : "option_1" , "optionText":""}] ,"required" :false}};
      vm.allQuestionsList.push(question);
      vm.glued = true;

      vm.turnActive(question);
       console.log(vm.allQuestionsList)
    }
    function addTextTypeQuestion(){
      vm.isSaved = true;
      var question = {"type":"text","question":{"text" : "" , "required" :false} };
      vm.allQuestionsList.push(question);
      vm.glued = true;

      vm.turnActive(question);


    }
    function addAudioTypeQuestion(){
      vm.isSaved = true;
      var question = {"type":"audio","question":{"text" : "" , "fileName":"" ,"required" :false}};
      vm.allQuestionsList.push(question);
      vm.glued = true;

      vm.turnActive(question);


    }
    function addMoreOptions(index){
      vm.isSaved = true;
	  console.log("running2");
      vm.allQuestionsList[index].question.options.push({"optionId" : "option_"+(vm.allQuestionsList[index].question.options.length +1) , "optionText":"option_"+(vm.allQuestionsList[index].question.options.length +1)});



    }
    function deleteQuestion(question){
      
         
          
          var index = vm.allQuestionsList.indexOf(question);
          vm.allQuestionsList.splice(index, 1);
          vm.questionnaireList[vm.index].splice(index,1);
           

          //utilCustom.toaster($filter('translate')('question.item') + ' ' + $filter('translate')('question.deleted'));
         
      
    }
    function removeOption(indexx,option){
      var index= vm.allQuestionsList[indexx].question.options.indexOf(option);
      vm.allQuestionsList[indexx].question.options.splice(index,1);
      vm.isSaved = true;

    }
    function turnActive(section) {

      vm.selectedDiv = section;
    }
    function isSelected(section) {
      return vm.selectedDiv === section;
    }
    function submitResponse(formName,description){

      if(vm.createOrEdit =="create") {
        var listSave = {"formName": formName, "description" : description, "list": vm.allQuestionsList};
        questionnaireService.save(listSave).then(function (response) {
           vm.isSaved = false;
          response.questionsList.map(function(questionnaire){
            console.log(questionnaire);
            if(questionnaire.type =="mcq" || questionnaire.type=="dropDown" || questionnaire.type=="checkBox"){
              questionnaire.question.options = (JSON.parse(questionnaire.question.options))
            }

          });

          vm.questionnaireList.push(response.questionsList);
          showQuestionnaire(vm.questionnaireList.length - 1);
         }, function (error) {
           console.log(error)
        });
      }
      if(vm.createOrEdit =='edit'){
        var listUpdate = {"Id" : vm.formId,"formName": formName, "list": vm.allQuestionsList};
        questionnaireService.update(listUpdate).then(function (response) {
          vm.isSaved = false;
           response.Questionnaire.map(function(questionnaire){
            console.log(questionnaire);
            if(questionnaire.type =="mcq" || questionnaire.type=="dropDown" || questionnaire.type=="checkBox"){
              questionnaire.question.options = (JSON.parse(questionnaire.question.options))
            }

          });
          vm.questionnaireList[vm.index] = angular.copy(response.Questionnaire);
          //showQuestionnaire(vm.index);
         }, function (error) {
           console.log(error)
        });
      }
    }
    function saveQuestionnaireDialog(e){
      $mdDialog.show({
        controller         : 'questionnaire',
        controllerAs       : 'vm',
        templateUrl        : 'app/PCS/questionnaire/dialogBox/dialog.html',
        parent             : angular.element($document.body),
        targetEvent        : e,
        clickOutsideToClose: true
      }).then(function(data){
        vm.isSaved = false;

      })
    }
    function  closeDialog(){
      $mdDialog.hide();
    }
    function saveDialog(ev) {
        var confirm = $mdDialog.prompt()
          .title($filter('translate')('question.saveForm'))
          //.textContent('Bowser is a common name.')
          .placeholder($filter('translate')('question.formName'))
          .ariaLabel($filter('translate')('question.formName'))
          .initialValue(vm.formName)
          .targetEvent(ev)
          .ok($filter('translate')('generic.save'))
          .cancel($filter('translate')('generic.cancel'));
        $mdDialog.show(confirm).then(function (result) {

         submitResponse(result,vm.guideDescription);

        }, function () {
          console.log("cancel");

        });
    }
    function getQuestionnaireList(){
      questionnaireService.list({}).then(function(response){
        console.log(response);
        response.questionnaireList.map(function(questionnaire){
          console.log(vm.questionnaireList);
          questionnaire.map(function(e){
            if(e.type =="mcq" || e.type== "dropDown" || e.type =="checkBox"){
              e.question.options = (JSON.parse(e.question.options))
            }
          });
          vm.questionnaireList.push(questionnaire)
        });

      },function(error){
        console.log(error)
      });

    }
    function showQuestionnaire(index){
      vm.createOrEdit = 'edit';
      vm.disableOrder = "moved";
      vm.index = index;
      vm.allQuestionsList = [];
      vm.formName = vm.questionnaireList[index][0].questionnaire;
      vm.formId = vm.questionnaireList[index][0].questionnaireId;
      vm.questionnaireList[index].map(function(e){
        vm.allQuestionsList.push(e);
      })
    }

    function deleteQuestionnaire(){
     }
    function dragStart(){
      vm.disableOrder = undefined
    }
    function create(){
     // $('#sideNavList').css('display', 'none');
      vm.createOrEdit = "create";
      vm.formName = "";
      vm.isOpen = true;
      vm.allQuestionsList = []
    }
    function previewQuestionnaire() {

      $mdDialog.show({
          locals:{allQuestions: vm.allQuestionsList},
          controller: 'tempCtrl1',
          controllerAs : 'vm',
          templateUrl: 'app/questionnairePopUp.html',
          clickOutsideToClose:true,
          fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {

        }, function() {
          vm.allQuestionsList.map(function(e){
            delete e.question.answer;
          });

        });
    }
      vm.hello = 'Hello World!';
      vm.sortableCardOptions = {
        appendTo            : 'body',
        connectWith         : '.list-cards',
        delay               : 75,
        distance            : 7,
        forceHelperSize     : true,
        forcePlaceholderSize: true,

        helper              : function (event, el)
        {
          return el.clone().addClass('list-card-sort-helper');
        },

        placeholder         : 'list-card card-sortable-placeholder',
        tolerance           : 'pointer',
        scroll              : true,

      };
    }



  });
