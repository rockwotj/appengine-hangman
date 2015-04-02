
var App = angular.module('AppControllers', []);

App.controller('MainCtrl', function($scope, $rootScope, cloudEndpoints) {
  $scope.game = {'display_word': [' '], 'guesses': ""};
  $scope.guess = "";
  $scope.wrongAnswers = 0;
  // Force sign in on start up
  cloudEndpoints.signin(function() {
    $rootScope.status = 'User Authenticated!';
    $rootScope.$apply();
    $scope.newGame();
  });
  var bindResult = function(game) {
    $scope.wrongAnswers = 0;
    var guesses = game.guesses.split("");
    for (var i = 0; i < guesses.length; i++) {
      if(game.display_word.indexOf(guesses[i]) === -1) {
        $scope.wrongAnswers++;
      }
    }
    game.display_word = game.display_word.split("");
    $scope.game = game;
    $scope.$apply();
  }
  $scope.newGame = function() {
    console.log("New Game!");
    cloudEndpoints.doCall().then(function(api) {
      api.client.hangman.new().execute(function(resp) {
        console.log(resp.result);
        bindResult(resp.result);
      });
    }, function(api) {
      $rootScope.status = 'Endpoints Call Failed!';
      $rootScope.$apply();
    });
  };
  $scope.makeGuess = function(letter) {
    console.log("Guessing: " + letter);
    cloudEndpoints.doCall().then(function(api) {
      var game = $scope.game;
      game.display_word = game.display_word.join("");
      game.guesses += letter;
      api.client.hangman.guess(game).execute(function(resp) {
        console.log(resp);
        bindResult(resp.result);
        $scope.guess = "";
      });
    }, function(api) {
      $rootScope.status = 'Endpoints Call Failed!';
      $rootScope.$apply();
    });
  };
  $scope.toggleGuessDialog = function() {
    document.querySelector('paper-action-dialog').toggle();
  };
});
