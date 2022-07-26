# Desert Strike Password Translator

This is a password translator for the amazing video game Desert Strike. It supports password generation from a desired level and score as well as deriving the level and score from a valid password.

# Purpose

This was a practice project to get used to Electron. Also, I've always been interested in Desert Strike ever since I first played it.

#Dependencies

Xel Toolkit: https://xel-toolkit.org/

#Known Issues

- Some Level 2 passwords cannot be generated with certain high scores. I'm unsure if this is due to a limitation of the password system, or if there is a bug. This remains something to sort out.
- The score text input and the score slider input are not always 100% synced. I could afford to redo the data bindings.

#TODO:

If you would like to contribute:

- The code for password generation and deciphering could really afford to be rewritten.
- The code for password generation and deciphering could really afford to be moduliarized.
- A version should be displayed on the main window that pulls from app.getVersion() or some equivalent.
