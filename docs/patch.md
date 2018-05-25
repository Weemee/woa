# Patch notes

## Earliest early-early alpha access

=================================================

##### *Version 0.0.119*

## General
* Fixed TODO.todo and it's again inside the 'docs' dir. It's also being managed inside 'sublimetext3' instead of 'VS Code'. I like the 'todo' extension inside Sublime
* Added 'Design' dir for mockups. It's also part of .gitignore
* Specializations has been added. The different ones are below
	* Arithmetic (Mathematician)
	* Capitalist
	* Casual
	* Collector
	* Engineer
	* Explorer
	* Farmer
	* Scientist

	Each of these specializations will provide a bonus towards a certain playstyle, while also giving you a talent tree advantage in that direction (yes, talent tree, how revolutionary!). The talent tree will however be unique in some way before it's implemented.

	You are never locked in the specialization you choose in the start, it's just a helping hand for you to get started in the right direction fitting your playstyle. You can change this whenever you want and expand all talent tree's however you choose. The bonus towards this playstyle is later enhanced the further you progress down a certain path, and the same level of bonus can be obtained by everyone.
	
	To make it simple, instead of spending 10 hypothetical talent points in a certain tree to unlock 'Level 1 Engineering bonus', you get it right away if you choose 'Engineer'. Once you reach that same point in the talent tree, you don't get anything special (since you already have it). The time to get there for you will be faster than someone who have not chosen this starting path.

## Client
* Added an 'edit' function in character preview. You can now change the name of your character as you like. A cooldown will be added soon
* A confirmation input field has been added in the 'edit' section of the character preview. In order to edit, you need to type 'CONFIRM'
* More notifications regarding user input. Most inputs regarding 'characters' and 'accounts' should now display a proper notification message

## Server
* Removed 'loggedIn' as a table row for the Character schema 
* Added 'events.json' under the directory 'libs/serverData'. It contains random events that will give buffs / debuffs. Missed to add it in 'Version 0.0.101' patch notes
* Added multiple input limitations for 'account name' and 'character name'. You are now only allowed to use unicode letters
* Characters can be edited now in the database
* Support for the following databases
	* Resources
	* Location
	* Levels
	* Stats

	Next update should have these implemented as a visual representation on the client.

## Bugfixes
* Fixed an issue with fullscreen mode being called while not logged in with a character when pressing the 'enter' key

=================================================

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

=================================================

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

=================================================

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

=================================================
