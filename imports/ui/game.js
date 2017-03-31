import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './game.html';

//make global
/*
	Exception in template helper: TypeError: Cannot read property 'xs' of undefined
*/
let xs;
let os;
let game_id;
let game;
let winningCombinations = [
	['a', 'b', 'c'],
	['d', 'e', 'f'],
	['g', 'h', 'i'],

	['a', 'd', 'g'],
	['b', 'e', 'h'],
	['c', 'f', 'i'],

	['a', 'e', 'i'],
	['c', 'e', 'g'],
];
let xWin = false;
let oWin = false;

function checkWinner(){
	for (let i=0; i<winningCombinations.length; i++){
		let xCount = 0;
		let oCount = 0;
		for (let j=0; j<winningCombinations[i].length; j++){
			let mini = winningCombinations[i][j];

			let result = $('td[data-pos=\'' + mini + '\']').text();

			if (result == 'X') xCount++;
			else if (result == 'O') oCount++;
		}

		if (xCount == 3) xWin = true;
		else if(oCount == 3) oWin = true;
	}
}

Template.registerHelper('incremented', function (index) {
    index++;
    return index;
});

Template.Game.helpers({
	game() {
		game = Games.findOne({_id: FlowRouter.getParam('id')});
		xs = game.xs;
		os = game.os;
		game_id = FlowRouter.getParam('id');

		return game;
	},
	grabUserName : function(_id){
		//this returns a cursor and that's why we have to do .fetch on it
		return Meteor.users.find(_id).fetch()[0].username;
	},
    belongs : function() {
    	return ((xs == Meteor.userId()) || (os == Meteor.userId()));
    },
    currentUserIsOs : function() {
    	return ((os == Meteor.userId()));
    },
    currentUserIsXs : function() {
    	return ((xs == Meteor.userId()));
    }
});

Template.Game.events({
  'click td'(event){

	   	//game_id, xs, os is available here

    	let targ = $(event.target);
    	let pos = targ.data('pos');

    	//only fill in if empty
    	if (targ.text() == ''){
    		var ob = {};
    		
    		checkWinner();

    		if (xWin){
    			ob['win'] = true;
    			ob['winner'] = game.xs;
    		}

    		if (oWin){
    			ob['win'] = true;
    			ob['winner'] = game.os;
    		}

    		if (xs == Meteor.userId()){	
    			ob[pos] = 'X'
	    		Games.update(FlowRouter.getParam('id'), {
	    		  $set: ob,
	    		});
    		}

    		if (os == Meteor.userId()){
    			ob[pos] = 'O'
    			Games.update(FlowRouter.getParam('id'), {
    			  $set: ob,
    			});
    		}
    	}
  },
});


