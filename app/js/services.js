var App = angular.module('AppServices', []);

App.service('cloudEndpoints', function ($q, $rootScope) {
  this.doCall = function() {
    var p = $q.defer();
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: true
    }, function(){
      var request = gapi.client.oauth2.userinfo.get().execute(function(resp) {
        if (!resp.code) {
          p.resolve(gapi);
        } else {
          p.reject(gapi);
        }
      });
    });
    return p.promise;
  };
  
  this.signin=function(callback) {
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false
    }, callback);
  };
});
