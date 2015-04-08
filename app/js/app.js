'use strict';

var app = angular.module('App', ['AppControllers', 'AppServices']);

app.run(function($rootScope){
 angular.element(document.querySelector('.launch')).removeClass('hidden');
 angular.element(document.querySelector('.loading')).addClass('hidden');
});
