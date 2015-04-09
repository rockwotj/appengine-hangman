var app = angular.module('AppControllers', []);

app.controller('MainCtrl', function($scope, oAuth, codeTypes) {
  $scope.game = {'display_word': [], 'guesses': ""};
  $scope.codeType = 'Text';
  $scope.codeTypes = codeTypes;
  $scope.wrongAnswers = 0;
  var makingApiCall = false;
  var resetKeyboard = function() {
    $scope.keyboard = "qwertyuiopasdfghjklzxcvbnm".toUpperCase();
  }
  var isGameOver = function() {
    if ($scope.game.display_word.indexOf('_') === -1) {
      document.querySelector('#won-dialog').toggle();
      return true;
    } else if($scope.wrongAnswers >= 6) {
      document.querySelector('#lost-dialog').toggle();
      return true;
    }
    return false;
  };
  var afterOAuth = function() {
    $scope.newGame(function() {
      angular.element(document.querySelector('#game')).removeClass('hidden');
      angular.element(document.querySelector('.launch')).addClass('hidden');
      angular.element(document.querySelector('.loading')).addClass('hidden');
    });
  };
  oAuth.signin(true, function(authResult) {
    if (!authResult.error) {
      afterOAuth();
    } else {
      angular.element(document.querySelector('.launch')).removeClass('hidden');
      angular.element(document.querySelector('.loading')).addClass('hidden');
    }
  });
  $scope.launch = function() {
    oAuth.signin(true, function(authResult) {
      if (authResult.error) {
        //Make call with popup
        oAuth.signin(false, afterOAuth);
      } else {
        afterOAuth();
      }
    });
  };
  var bindResult = function(game) {
    $scope.wrongAnswers = 0;
    var guesses = game.guesses.split("");
    resetKeyboard();
    for (var i = 0; i < guesses.length; i++) {
      $scope.keyboard = $scope.keyboard.replace(guesses[i], ' ');
      if (game.display_word.indexOf(guesses[i]) === -1) {
        $scope.wrongAnswers++;
      }
    }
    game.display_word = game.display_word.split("");
    $scope.game = game;
    // This updates Angular Bindings.
    // Assumed that bindResult is called from a non-angular
    // generated event (like the hangman API callback)
    $scope.$apply();
  };

  $scope.setCodeType = function(codeType) {
    $scope.codeType = codeType;
  };

  $scope.newGame = function(callback) {
    if(makingApiCall) {
      return;
    }
    callback = callback || function(){};
    makingApiCall = true;
    oAuth.doCall().then(function(api) {
      api.client.hangman.new().execute(function(resp) {
        if (resp.code) {
          console.log(resp);
          callback();
          makingApiCall = false;
          return;
        }
        bindResult(resp.result);
        callback();
        makingApiCall = false;
      });
    }, function(api) {
      callback();
      makingApiCall = false;
      console.log('API Call Failure!');
    });
  };

  $scope.makeGuess = function(letter) {
    if(isGameOver()) {
      return;
    }
    letter = letter.toUpperCase();
    if (letter.length !== 1) {
      return;
    } else if ($scope.game.guesses.indexOf(letter) > -1) {
      return;
    } else if (makingApiCall) {
      return;
    }
    makingApiCall = true;
    oAuth.doCall().then(function(api) {
      var game = $scope.game;
      game.display_word = game.display_word.join("");
      game.guesses += letter;
      api.client.hangman.guess(game).execute(function(resp) {
        if (resp.code) {
          console.log(resp);
          makingApiCall = false;
          return;
        }
        bindResult(resp.result);
        makingApiCall = false;
      });
    }, function(api) {
      makingApiCall = false;
      console.log('API Call Failure!');
    });
  };
});
