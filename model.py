from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb.model import EndpointsModel

class HangmanGame(EndpointsModel):
    """
    Id of User
    """
    _message_fields_schema = ("entityKey", "display_word", "guesses")
    word = ndb.StringProperty() #hangman
    display_word = ndb.StringProperty() #"H_N_M_N"
    guesses = ndb.StringProperty() #"HNMXYZBC"

#From Hasbro: http://www.hasbro.com/common/instruct/Hangman_Word_List.pdf
SECRET_WORD_LIST = ["ABOUT","ACROSS","ADDRESS","ACCIDENT",
                    "ABOVE","AFRAID","AGAINST","AIRPLANE",
                    "AFTER","ALWAYS","ALREADY","ALTHOUGH",
                    "AGAIN","ANIMAL","ANOTHER","ANYTHING",
                    "APPLE","ANSWER","ANXIOUS","ANYWHERE",
                    "BEGAN","ANYONE","BALCONY","BACKWARD",
                    "BEGIN","AROUND","BALLOON","BARNYARD",
                    "BLACK","BASKET","BATTERY","BASEBALL",
                    "BLOCK","BEFORE","BECAUSE","BIRTHDAY",
                    "BRING","BEHIND","BEDROOM","BUSINESS",
                    "BROOK","BELONG","BELIEVE","CHEERFUL",
                    "BROWN","BESIDE","BENEATH","BUSINESS",
                    "BUILD","BETTER","BETWEEN","COMPLETE",
                    "CHAIR","BOTTLE","BICYCLE","CUSTOMER",
                    "COLOR","BOTTOM","BLANKET","DARKNESS",
                    "COULD","BOUGHT","BROTHER","DAUGHTER",
                    "DANCE","BOUNCE","CAREFUL","DAYDREAM",
                    "DRINK","BRANCH","CHICKEN","DISCOVER",
                    "EMPTY","BRIDGE","COUNTRY","DISTANCE",
                    "FOUND","BUTTON","CUPCAKE","DOORBELL",
                    "FUNNY","CANDLE","EVENING","ELECTRIC",
                    "GREEN","CANNOT","EXCITED","ELECTION",
                    "GUESS","CAUGHT","FEATHER","ELEPHANT",
                    "HAPPY","CELLAR","HERSELF","ELEVATOR",
                    "HELLO","CHANCE","HIMSELF","ENORMOUS",
                    "HORSE","COWBOY","INSTEAD","EVERYONE",
                    "HOUSE","DOCTOR","KITCHEN","FAVORITE",
                    "HURRY","DRAGON","MORNING","FOOTBALL",
                    "LARGE","FATHER","NOTHING","FOUNTAIN",
                    "LAUGH","FRIEND","OUTSIDE","FRIENDLY",
                    "LEARN","KITTEN","PICTURE","FRIGHTEN",
                    "MAYBE","LITTLE","RACCOON","GOODNESS",
                    "NEVER","MOTHER","SNOWMAN","GRATEFUL",
                    "PAINT","PEANUT","SOMEONE","HANDSOME",
                    "PENNY","PLEASE","STOPPED","LEMONADE",
                    "STORE","POCKET","THOUGHT","MOUNTAIN",
                    "THANK","RABBIT","THROUGH","NEIGHBOR",
                    "THEIR","ROCKET","TONIGHT","REMEMBER",
                    "TRAIN","SCHOOL","TRACTOR","SIDEWALK",
                    "TRUCK","SHOULD","TRAFFIC","SOMETIME",
                    "UNDER","SISTER","TROUBLE","SQUIRREL",
                    "WHERE","STREET","UNHAPPY","SURPRISE",
                    "WHICH","TURTLE","WHISPER","TOGETHER",
                    "WHITE","WINDOW","WHISTLE","TOMORROW",
                    "WOULD","YELLOW","WITHOUT","YOURSELF"]
