from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb.model import EndpointsModel

SECRET_WORD_LIST = []

class HangmanGame(EndpointsModel):
    """
    Id of User
    """
    message_field_schema = ("entityKey", "creator", "display_word", "guesses", "last_touch_date_time")
    word = ndb.StringProperty() #basic
    display_word = ndb.StringProperty() #"ba**c"
    guesses = ndb.StringProperty() #"abcyz"
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)