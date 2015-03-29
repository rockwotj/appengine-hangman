from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb.model import EndpointsModel

class Guest(ndb.Model):
  first = ndb.StringProperty()
  last = ndb.StringProperty()


def AllGuests():
  return Guest.query()


def UpdateGuest(id, first, last):
  guest = Guest(id=id, first=first, last=last)
  guest.put()
  return guest


def InsertGuest(first, last):
  guest = Guest(first=first, last=last)
  guest.put()
  return guest


def DeleteGuest(id):
  key = ndb.Key(Guest, id)
  key.delete()

class SecretWord(EndpointsModel):
    """
    List of these are all of the registered available games, note word is not sent via Endpoints    
    """
    message_field_schema = ("entityKey", "creator", "word_length", "last_touch_date_time")
    word = ndb.StringProperty() #"basic"
    creator = ndb.StringProperty() #"Rocky" 
    word_length = ndb.ComputedProperty(lambda (self): len(self.word))
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)

class HangmanGame(EndpointsModel):
    """
    Parent key of User,
    Once a user "selects a SecretWord, their game and progress is represented by this model"    
    """
    message_field_schema = ("entityKey", "creator", "display_word", "guesses", "last_touch_date_time")
    word = ndb.KeyProperty(kind=SecretWord)
    creator = ndb.ComputedProperty(lambda(self): self.word.get().creator)
    display_word = ndb.StringProperty() #"ba**c"
    guesses = ndb.StringProperty() #"abcyz"
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)