# Patch notes

## Earliest early-early alpha access

***
=================================================

##### *Version 0.0.387*

## General
* Temp

## Client
* Temp

* <h4>Bugs</h4>

## Server
* Temp

* <h4>Bugs</h4>

## Misc/Dev/Git/Boring stuff
* Refactored all database modules to ES6 while also cleaning them up

***
=================================================

##### *Version 0.0.387*

## General
* Can now generate Hydrogen and Helium as resources (not saving)
* Now has triggers based on resource levels
* Now supports 'account level', to determine admins, plebs, etc
* Admin support has been added
* Design mode has been added

## Client
* Various support for upcoming functions, examples:
	* Account levels (devs, admins, mods, tester, etc)
	* UI editing
	* Theme building
	* Live feedback suggestions to devs and admins
* Now recieves all elements in the periodic table as a resource (118) of them
* Added a feedback button next to the 'bug' button
	* You will be able to send direct feedback in here, with a navigation bar on the top for subject
* Themes are now fully functional and has been re-factored, supporting a more smooth solution (and a basic way for a modular scss configuration, based on database tables)

* <h4>Bugs</h4>

## Server
* Auto save now actually saves the character
* Auto save timer changed to every 15s, up from 10s
* Game loop added
* Does a check every 1000ms, checking:
	* Resource generation/gathering/collection
	* Trigger requirements. When meeting the requirement, you access the following:
		* Unlocks
		* Upgrades
		* Research
	* More to come
* Database support for the 118 elements
* Dynamically saves the databases related to the character
* Now stores the themes in the database
* Loads all the themes in the database
* Fetches theme from account
* Saves theme to account

* <h4>Bugs</h4>

## Misc/Dev/Git/Boring stuff
* All 118 elements are now in the database
* Moved everything from github to gitlab (F Microsoft with them ruining everything). Might swap back in-case Microsoft does not fuck things up this time, I'll keep an eye out. Until then, I move my OPEN SOURCE somewhere else

***
=================================================

##### *Version 0.0.168*

## General
* Temp

## Client
* Now visually displays 'the universe' after you login with your character
* The HUD, GUI, UI, whatever you want to call it, is now laying on top of 'the universe'
* Added a grid layout with a toggle button
	* The grid layout is intended to support custom layout for the user, which will be saved in the database
* Added a bottom menu for interface containers
* Added multiple interface containers for testing
* Full navigation for all character items
	* <h5>Bugs</h5>


## Server
* Reserved names now apply to 'edit character'
	* <h5>Bugs</h5>



## Misc/Dev/Git/Boring stuff
* Temp

***
=================================================

##### *Version 0.0.159*

## General
* 

## Client
* Successfully recieves all character information, stats, levels, etc
* Character handling screen has been refactored
	* Most of the things are now in modules, instead of a huge chunk in one file
* You can now 'create', 'edit', 'play' and 'delete' characters freely. The client updates and checks all states

<h5>Bugs</h5>

* Fixed an issue with the character screen not updating after deleting characters


## Server
* Fetching all needed character information, while also checking if that information exists as a table row. This fetch is done with one database request with inner-joins through sequelize (which I finally have started to learn and understand, huge refactoring is on the todo list)
* Sending all character information to the client as one character object, which should be easy to modify within the object itself
* Character is now successfully deleted 
* Resolved sending an empty 'character list' to the client
* Functionality of reserving character names is now in place
* Character creation now creates all needed tables (as of now) while also deleting them

## Misc/Dev/Git/Boring stuff
* More database updates

***
=================================================

##### *Version 0.0.147*

## General
* Now visually displays your specialization when you're logged in with a character
* Split and enhanced the 'loading screen'. Just a pleb filter for now
* First time character login is now a thing, generating table rows as needed
* Minor fixes here and there (I did too much split coding without commiting)

## Client
* Changed the file '../character/card' to 'previewCard' to separate it from in-game view of the character card. The new in-game display is called 'selectedCard'
* Set loading is engaged on the client side
* Now show 'stats'

## Server
* Specialization is fully added upon character creation
* Clear loading is now sent from the server before the actual package
* Checking if you have the following instances in the database
	* Levels
	* Location
	* Research
	* Resources
	* Talents
	* Unlocks
* Adding 'levels' for now to the character object
* Changed all database calls to match the new database name changes
* Now fetches the 'stats' database as part of the 'character' object. Same thing will be added to talents, resources, etc

## Bug fixes
* Fixed a bug that caused the trigger inside '../character/card' to trigger while being logged in with a character

## Misc/Dev/Git/Boring stuff
* Updated TODO.todo to work inside vs code
* Changed all database names to easier navigate through them. Some examples below: 
	* characters => **characterObject**
	* accounts => **accountObject**
	* galaxies => **serverGalaxies**
	* solarsystems => **serverSolarsystems**
	* levels => **characterLevels**
	* talents => **characterTalents**

***
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

## Bug fixes
* Fixed an issue with fullscreen mode being called while not logged in with a character when pressing the 'enter' key

***
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

***
=================================================

##### *Version 0.0.92*

## Game
* No game changes made, missing gameplay

## General
* Can now report a bugs through the platform

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

***
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

***
=================================================
