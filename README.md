# Meteor Multiplayer Tic Tac Toe Example

4/27/17 -> start button KIND OF works 

added these fields to the games collection:

```
x_start: false,
o_start: false,
start_time: new Date(), // current time
```

body.js saves x_start to true when x clicks start and updates start_time
body.js saves o_start to true when o clicks start and updates start_time

however the game page doesn't automatically change the buttons until you refresh.

I need to change it so that the UI changes after that.

```
{{#if bothUsersClickedStart}}
	<div>Game Starting in <span>10</span> seconds!</div>
{{else}}
	{{#if currentUserClickedStart}}
		<button id="startGame" disabled>Start Game</button> Waiting for opponent
	{{else}}
		<button id="startGame">Start Game</button>
	{{/if}}
{{/if}}
```

4/2/17 -> game saves winner and win but saves the turn after the win (relevant code is in game.js and game.html)

ctrl + m brings up meteor toys -> yet another reason to use Meteor.

## Warning brah

autopublish and insecure meteor packages are being used so don't deploy this without removing them and implementing subscriptions and publications.

## How do I learn this?

You can learn the majority of how to do this by going thorugh this to do list tutorial on Meteor.com:

Learn how to build this app by following the [Meteor Tutorial](http://www.meteor.com/install).

Read more about building apps with Meteor in the [Meteor Guide](http://guide.meteor.com).
