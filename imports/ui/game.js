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

function checkWinner(g){

	for (let i=0; i<winningCombinations.length; i++){
		let xCount = 0;
		let oCount = 0;
		for (let j=0; j<winningCombinations[i].length; j++){
			let mini = winningCombinations[i][j];

			let result = g[mini]

			// console.log('-------mini, result---------');
			// console.log(mini, result);
			// console.log('----------------');

			if (result == 'X') xCount++;
			else if (result == 'O') oCount++;
		}

		if ((xCount > 0) || (oCount > 0)){
			console.log('---------xCount, oCount---------');
			console.log(xCount, oCount)
			console.log('------------------');

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
    },
    currentUserClickedStart : function() {
        if (xs == Meteor.userId()){
            return (game.x_start == true);
        }else if(os == Meteor.userId()){
            return (game.o_start == true);
        }
    },
    bothUsersClickedStart : function() {
        return ((game.x_start == true) && (game.o_start == true));
    }
});

//basically it's going in and not finding winners
//because it checks the ui before it updates the database
//and the ui updates after the database updates
Template.Game.events({
  'click #startGame'(event){        
    let ob = {};
        
    //set x_start or o_start to true depending on who clicked the start button
    let whoClicked = (xs == Meteor.userId()) ? 'x_start' : 'o_start';
    ob[whoClicked] = true;
    ob['start_time'] = Date.now(); //doesn't save properly into mongo document -> it comes in like this: "start_time" : 1493321505034.0,

    Games.update(FlowRouter.getParam('id'), {
      $set: ob,
    }, function(err){
      console.log('hit call back');
      if (game.x_start && game.o_start){
        console.log('hit line 106');
      }else{
        console.log('hit line 108');
      }
    });

  },
  'click td'(event){

	   	//game_id, xs, os is available here

    	let targ = $(event.target);
    	let pos = targ.data('pos');

    	//only fill in if empty and win is false
    	if (((targ.text() == '') && (xWin == false) && (oWin == false)) && game.win == false) {
    		var ob = {};

    		if (xs == Meteor.userId()){	
    			ob[pos] = 'X'
    		}

    		if (os == Meteor.userId()){
    			ob[pos] = 'O'
    		}

    		Games.update(FlowRouter.getParam('id'), {
    		  $set: ob,
    		}, function(err){
    			
    			checkWinner(game);

    			if ((xWin == true) || (oWin == true)){
    				console.log("-----xWin, oWin--------");
    				console.log(xWin, oWin);
    				console.log("-------------");
    			}
    			
    			if (xWin || oWin){
    				let ob = {}
    				ob['win'] = true;
    				if (xWin) ob['winner'] = game.xs;
    				else ob['winner'] = game.os;

    				Games.update(FlowRouter.getParam('id'), {
    				  $set: ob,
    				});
    			}
    		});
    			    		
    	}
  },
});


