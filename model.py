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


class HangmanGame(EndpointsModel):
    secret_word = ndb.StringProperty()
    letters_guessed = ndb.StringProperty()
    display_word = ndb.ComputedProperty(get_display_word)
    
    def get_display_word(self):
        displayed = ""
        for letter in secret_word:
            if letter in letters_guessed:
                displayed += letter
            else:
                displayed += '*'
        return displayed