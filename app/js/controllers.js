
var App = angular.module('AppControllers', []);

App.controller('MainCtrl', function($scope, $rootScope, cloudEndpoints) {
  $scope.game = {'display_word': [' '], 'guesses': ""};
  $scope.guess = "";
  $scope.wrongAnswers = 0;
  var setStatus = function(status) {
	$rootScope.status = status;
	$rootScope.$apply();
  }
  // Force sign in on start up
  cloudEndpoints.signin(function() {
    setStatus('User Authenticated!');
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
    setStatus('Getting new game from server...');
    cloudEndpoints.doCall().then(function(api) {
      api.client.hangman.new().execute(function(resp) {
    	setStatus('New game created!');
    	console.log(resp.result);
        bindResult(resp.result);
      });
    }, function(api) {
    	setStatus('API Call Failure!');
    });
  };
  $scope.makeGuess = function(letter) {
	$scope.guess = "";
	letter = letter.toUpperCase();
	if (letter.length !== 1) {
		setStatus('Incorrect Guess!');
		return;
	} else if($scope.game.guesses.indexOf(letter) > -1) {
		setStatus('You already made that guess!');
		return;
	}
	setStatus('Sending Guess of ' + letter + ' to Server...');
    cloudEndpoints.doCall().then(function(api) {
      setStatus('Made the guess!');
      var game = $scope.game;
      game.display_word = game.display_word.join("");
      game.guesses += letter;
      api.client.hangman.guess(game).execute(function(resp) {
        console.log(resp);
        bindResult(resp.result);
      });
    }, function(api) {
    	setStatus('API Call Failure!');
    });
  };
  $scope.toggleGuessDialog = function() {
	 if($scope.game.display_word.indexOf('_') === -1) {
		document.querySelector('#won-dialog').toggle();
	} else if($scope.wrongAnswers < 6) {
		document.querySelector('#guess-dialog').toggle();
		document.querySelector('#guess').focus();
	} else {
		document.querySelector('#lost-dialog').toggle();
	}
  };
});
