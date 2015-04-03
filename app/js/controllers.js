var app = angular.module('AppControllers', []);

app.controller('MainCtrl', function($scope, $rootScope, oAuth, codeTypes) {
  $scope.game = {'display_word': [], 'guesses': ""};
  $scope.guess = "";
  $scope.codeType = 'Text';
  $scope.codeTypes = codeTypes;
  $scope.wrongAnswers = 0;
  
  var setStatus = function(status) {
  	$rootScope.status = status;
  }

  $scope.launch = function() {
	  oAuth.signin(function() {
		  setStatus('User Authenticated!');
		  angular.element(document.querySelector('#game')).removeClass('hidden');
		  angular.element(document.querySelector('.launch')).addClass('hidden');
		  $scope.newGame();
	  });
  };
  
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
    // This updates Angular Bindings.
    // Assumed that bindResult is called from a non-angular 
    // generated event
    $scope.$apply();
  };
  
  $scope.setCodeType = function(codeType) {
    $scope.codeType = codeType;
  };
  
  $scope.newGame = function() {
    setStatus('Getting new game from server...');
    oAuth.doCall().then(function(api) {
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
		setStatus('Invalid Guess!');
		return;
	} else if($scope.game.guesses.indexOf(letter) > -1) {
		setStatus('You\'ve already made that guess!');
		return;
	}
	setStatus('Sending Guess of ' + letter + ' to Server...');
	oAuth.doCall().then(function(api) {
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
