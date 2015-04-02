'use strict';

var App = angular.module('App', ['AppControllers', 'AppServices']);

App.run(function($rootScope, cloudEndpoints){
  $rootScope.status = "Endpoints Loaded!";
  angular.element(document.querySelector('#game')).removeClass('hidden');
});
