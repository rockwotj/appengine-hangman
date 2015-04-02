import endpoints
import random
from protorpc import remote
from model import HangmanGame, SECRET_WORD_LIST

WEB_CLIENT_ID = "767636924532-7qgufuhgrrkdarors317f9emgdhgb53p.apps.googleusercontent.com"

LOCALHOST_ID = "767636924532-43i4f4p4nsuqhabgfbkufd3jiia172ba.apps.googleusercontent.com"

@endpoints.api(name="hangman", version="v1", description="Hangman Game API",
               audiences=[WEB_CLIENT_ID, LOCALHOST_ID], allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID, WEB_CLIENT_ID, LOCALHOST_ID])
class HangmanApi(remote.Service):
    @HangmanGame.method(request_fields=(), user_required=True, name="new", path="new", http_method="GET")
    def new_hangman_game(self, empty):
        """ Creates a new hangman game for a user """
        user = endpoints.get_current_user()
        new_game = HangmanGame(id=user.email().lower())
        new_game.word = random.choice(SECRET_WORD_LIST)
        new_game.display_word = "_" * len(new_game.word)
        new_game.guesses = ""
        new_game.put()
        print new_game.word
        return new_game


    @HangmanGame.method(user_required=True, name="guess", path="guess", http_method="GET")
    def make_hangman_guess(self, hangman_game):
        """ Makes a guess for a certain hangman game """
        if not hangman_game.from_datastore:
            raise endpoints.BadRequestException('Not a valid hangman game')
        user = endpoints.get_current_user()
        old_game = HangmanGame.get_by_id(user.email().lower())
        hangman_game.guesses = hangman_game.guesses.upper()
        if hangman_game.guesses[:-1] != old_game.guesses:
            raise endpoints.BadRequestException('You cannot modify old guesses or make more than one guess at a time!')
        hangman_game.word = old_game.word
        new_display_word = ""
        for letter in hangman_game.word:
            if letter in hangman_game.guesses:
                new_display_word += letter
            else:
                new_display_word += '_'
        hangman_game.display_word = new_display_word
        hangman_game.put()
        return hangman_game


api = endpoints.api_server([HangmanApi], restricted=False)
