# Patch notes

## Earliest early-early alpha access

***
=================================================

##### *Version 0.0.498*

## General

## Client

<h4>General</h4>

* Create character now sends name, specialization, server and difficulty

<h4>Bugs</h4>

* Fixed a bug with the 'enter' key spamming errors in the log, when pressing it after going back from a logged in character

## Server

<h4>General</h4>

* Character difficulty applies to everything
* Refactored triggers
* Database interaction is more modular and fluid (got annoyed every time I had to add an association to something)

<h4>Bugs</h4>

## Misc/Dev/Boring stuff

***
=================================================

##### *Version 0.0.491*

## General
* Changed the description for the 'Arithmetic' specialization
	* From: 01+11=100 (or 4 if you prefer), easy!'
	* To: 10+11=101 (or 5 if you prefer), easy!'
* Changed the expire value of the 'signing secret' from 1h to 24h (to make it less annoying)

## Client

<h4>General</h4>

* Added more support and visuals depending on your account level. All the buttons have their unique icon to tell them apart
	* Admin button
	* Designer button
	* Feedback button
	* Bug report button
* Started the development for different modes, with the focus on 'admin mode' and 'designer mode'. They will allow you to change the game through your account
* Your last character played should now be stored and be pre-selected as you get to the character screen while logged in to your account
* Slowly updating the deprecating components within React
* Refactored props to match the new 'trigger & update' system

<h4>Themes</h4>

* All theme related implementations have been moved around and put in the 'theme system'
* Updated the header to support theme switching. Navigation drop down for resolutions matching tablets and phones is being re-made (broken for now)
* Applied the theme system to most visual elements, with some still untouched. The structure is still being worked on, but general testing and funcitonality is working as intended
* Implemented a modular way of dealing with updating css variables, adding support for database storing and using it all as props (which will help with editing/making themes)
* Slowly storing all css related stuff on the server side

<h4>Languages</h4>

* Now supports multiple languages
* Languages that has been implemented (briefly) is en-UK, sv-SE, de-DE

<h4>Bugs</h4>

* Fixed an issue that caused the header visuals to still be hidden after character logout through the browser 'back button'

## Server

<h4>General</h4>

* Added an error boundary
* Implemented themes and last character played
* Added more character support and variables, binding the character to more databases (like actions, unlocks)
* Removed redundant spaghetti code for checking databases, working on a new way to do it (was mainly for testing too, but probably need it to check that the character has all the databases related)
* Added a pause game state for the player (just pausing the update loop from being executed, still neat)
* Now has individual characterUnlocked tables
	* Changed 'research' to 'modifiers'. Might be put inside the unlock JSON
	* 'unlocks' removed and split into multiple sections
		* unlockedBuildings, tracking what buildings you can access
		* unlockedElements, tracking what elements you can access
		* unlockedFunctions, tracking something (don't know yet, think it will be gameplay unlocks)
		* unlockedResearch, tracking what research you can access
* The function 'stripFetched' inside the character object is now removing id, charID, createdAt and updatedAt, before exporting to the client (used for all database fetching that is not the actual 'characterObject' database). This is to send less to the client, while also not exposing too much
* Minor code tweeks for unused variables, functions, console.log, while also optimizing here and there (sometimes the opposite, ugh)
* Changed different triggers inside the object while also making it JSON friendly
* Added the entire theme system to be handled on the server side
* Changed the timer system so it could support the 'pause' functionality for characters
* Added all database support inside the 'libs/db' folder
* Started support for buildings

<h4>Triggers & progression</h4>
Now acts as the main way to progress in the game. Every character update call (game loop), there's a check to see if you have reached a certain trigger. The logic for that is built within the character object in multiple functions and checks, and will only go past the first function if certain criterias are met.<br><br>
Once a criteria is met, it filters through where to unlock something and trigger the functions associated to it. Depending on the gameplay, different things can happen, like (these are all examples):

***
* Elements - Reaching 15 'Hydrogen', will give access to 'Helium'
* Buildings - Having 10 Hydrogen and 10 Helium, will unlock the building tab, giving you access to the build tab
* Research - After building your first thing, will give you access to research 'exploration'
* Functions - When you have researched 'exploration', will unlock an entire new gameplay element

Most of the things being unlocked, will be announced in some way. Most likely it will render something new for you on the client, but future options could be pop-up text or chat text.

<h4>Bugs</h4>

## Misc/Dev/Boring stuff
* Refactored all database modules to ES6 while also cleaning them up
* Re-structured the patch notes layout

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


## Server
* Reserved names now apply to 'edit character'


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

<h4>Bugs</h4>

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
