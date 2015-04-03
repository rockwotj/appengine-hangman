'use strict';

var app = angular.module('App', ['AppControllers', 'AppServices']);

app.run(function($rootScope){
  $rootScope.status = "Endpoints & Angular Loaded!";
});
