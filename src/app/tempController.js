/**
 * Created by Muhammad Usman on 3/30/2017.
 */
(function(){
  'use strict';
  angular
    .module('app')
    .controller('tempCtrl1', tempCtrl);
  function tempCtrl(allQuestions,questionnaireService,$mdDialog)

  {
    var vm = this;
    vm.allQuestionsList = allQuestions;
    vm.cancel = cancel;

    vm.submitQuestionnaireResponse = submitQuestionnaireResponse;
    vm.changeIt = changeIt;
    vm.isThere = isThere;
    vm.multipleAnswers = [];

    function submitQuestionnaireResponse(){
      console.log(vm.allQuestionsList);
      var listt = {"list": vm.allQuestionsList};
       
      questionnaireService.saveQuestionnaireResponse(listt).then(function (response) {
        vm.allQuestionsList.map(function(e){
          delete e.question.answer;
        });
        $mdDialog.hide();
        
 
      }, function (error) {
         console.log(error)
      });
    }
      function cancel() {
      $mdDialog.cancel();
    }
    function changeIt(item,list) {

      console.log("X");
      var idx =  list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    }
    function isThere(item,list) {
      console.log("y");
      return  list.indexOf(item) > -1;
    }

  }})();
