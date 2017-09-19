/**
 * Created by Muhammad Usman on 2/24/2017.
 */
(function(){
  'use strict';
  angular
    .module('app')
    .factory('questionnaireService',['$resource','$rootScope','$q',questionnaireService]);
  function questionnaireService($resource,$rootScope,$q)
  {
    var services = $resource(
      window.appBaseUrl2+'/questionnaire/show/',{id : '@id' },
      {
        update:{ method:'PUT',
          url:window.appBaseUrl2+'/questionnaire/update/',
          params:{
            data : '@list',
            name : '@formName',
            Id :  '@Id'
          }

        },
        list:{
          method:'GET',
          url:window.appBaseUrl2+'/questionnaire/list/'
          //isArray:false
        },
        show:{
          method:'GET',
          url:window.appBaseUrl2+'/service/show/'
          ,params:{
            id:'@id'
          }
        },

        delete:{
          method:'DELETE',
          url:window.appBaseUrl2+'/questionnaire/delete/'
          ,params:{
            id:'@id'
          }
        },
        deleteQuestions:
        {
          method:'DELETE',
          url:window.appBaseUrl2+'/questionnaire/deleteQuestion/'
          ,params:{
          id:'@id'
            }
         },
        save:{
          method:'POST',
          url:window.appBaseUrl2+'/questionnaire/save',
          params :{
            data : '@list',
           name : '@formName',
            description : '@description'
          }
        },
        saveQuestionnaireResponse :{

          method : 'POST',
          url : window.appBaseUrl2+'/questionnaire/saveQuestionnaireResponse',
          params : {
            data : '@list'
          }
        }



      });
    return{
      'update' : function(questionnaire){
        var defered  = $q.defer();
        services.update(questionnaire,function(response){ defered.resolve(response); },
          function(error)
          { defered.reject(error);});
        return defered.promise;
      },
      'save' : function(params){
        console.log(params);
        var defered  = $q.defer();
        services.save(params,function(params){ defered.resolve(params); },
          function(error)
          { defered.reject(error);});
        return defered.promise;
      },
      'saveQuestionnaireResponse' : function(params){
        console.log(params);
        var defered = $q.defer();
        services.saveQuestionnaireResponse(params, function(params){
          defered.resolve(params);
        }, function(error){defered.reject(error);});
        return defered.promise;

      },
      'list':  function(params){
        var defered  = $q.defer();
        services.list(function(response){ defered.resolve(response); },
          function(error)
          { defered.reject(error);});
        return defered.promise;
      },
      'show':function(id){
        var defered  = $q.defer();
        services.show(id,function(response){ defered.resolve(response); },
          function(error)
          { defered.reject(error);});
        return defered.promise;
      } ,
      'delete':function (id){
        console.log(id);
        var defered  = $q.defer();
        services.delete(id,function(response){ defered.resolve(response); },
          function(error)
          { defered.reject(error);});
        return defered.promise;
      },
      'deleteQuestions':function (id){
        console.log(id);
        var defered  = $q.defer();
        services.deleteQuestions(id,function(response){ defered.resolve(response); },
          function(error)
          { defered.reject(error);});
        return defered.promise;
      }



    }
  }

})();
