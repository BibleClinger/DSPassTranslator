# Desert Strike Password Translator

This is a password translator for the amazing video game Desert Strike. It supports password generation that will bring you to a desired level and score as well as deriving the level and score from a valid password.

# Purpose

This was a practice project to get used to Electron.

Also, I've always been interested in Desert Strike ever since I first played it. The game has already been out for decades, and passwords are already floating around all over the place. Nevertheless, this was an attempt at seriously understanding the nature of the password system, what it encodes, and how it encodes it, which was a fun project I've wanted to tackle for awhile.

# Dependencies

Xel Toolkit: https://xel-toolkit.org/

# To run from source:

Clone this repository, and run `npm start` in the main directory.

# "Help. I'm a user, and I just want to run it."

Check out the Releases section.

# Known Issues

- Some Level 2 passwords cannot be generated with certain high scores. I'm unsure if this is due to a limitation of the password system, or if there is a bug. This remains something to sort out.
- The score text input and the score slider input are not always 100% synced. I could afford to redo the data bindings. If you type in a score manually, be sure to press Enter.
- Only the SNES version is currently supported.

# TODO:

If you would like to contribute:

- The code for password generation and deciphering could really afford to be *rewritten*.
- The code for password generation and deciphering could really afford to be *moduliarized*.
- A version should be displayed on the main window that pulls from app.getVersion() or some equivalent.

# Thanks:

Thanks to acceleraptor for his late night help in understanding a good portion of the password system. When do we tackle the next project?
