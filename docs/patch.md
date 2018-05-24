# Patch notes

## Earliest early-early alpha access


=============================================================================

##### *Version 0.0.101*

## General
* Stars (suns) and planets are now in orbit in the solar system. They should be modular, dependant on player stats
* Graphical display and animations for the mentioned above

## Client
* Will now render stars and planets in orbit based on THREE.JS
* Added context-menu support. Can no longer 'right-click' the page content, except content made for it. There's a test on the start page
* Character select has changed, now shows a preview of selected character, where you have 'play' as an option
* Character delete, with input safety by typing 'DELETE' to activate button

## Server
* Implemented character limit of five (5)
* Character can be successfully deleted in the database

=============================================================================

##### *Version 0.0.92*

## Game
* No game changes made, missing gameplay

## General
* Can now report a bug through the website

## Client
* Recieve props:
	* Current servers (multiverses)
	* Logged in players
* Added character UI module
* Create character has more options
	* Can now choose which server to create a character on
* Now displays how many logged in players in the UI

## Server
* Added server map module
* Added server structure schema for MySQL
* Removed local server data folders, everything in database now
* Moved database module from 'engine/api/models' to 'libs/db'

=============================================================================

##### *Version 0.0.63*

## General
* Create charactar has been re-designed
* Can now login with a character of choice
* Added multiple database structures for character information
* Implemented support for totp/hotp/otp (Google Authenticator)

## Client
* Added a few more navigation paths

## Server
* Added encryption for sensitive information, like account passwords

=============================================================================
