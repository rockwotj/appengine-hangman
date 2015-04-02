var App = angular.module('AppServices', []);

App.factory('guestService', function($rootScope, $http, $q, $log) {
  $rootScope.status = 'Retrieving data...';
  var deferred = $q.defer();
  $http.get('rest/query')
  .success(function(data, status, headers, config) {
    $rootScope.guests = data;
    deferred.resolve();
    $rootScope.status = '';
  });
  return deferred.promise;
});