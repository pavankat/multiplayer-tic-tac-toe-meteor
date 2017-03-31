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
let Gamez = Games;

Template.registerHelper('incremented', function (index) {
    index++;
    return index;
});

Template.Game.helpers({
	game() {
		game = Gamez.findOne({_id: FlowRouter.getParam('id')});
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
    	if (targ.val() == ''){
    		var ob = {};

    		if (xs == Meteor.userId()){	
    			ob[pos] = 'X'
	    		Gamez.update(FlowRouter.getParam('id'), {
	    		  $set: ob,
	    		});
	    		targ.text('X');
    		}

    		if (os == Meteor.userId()){
    			ob[pos] = 'O'
    			Gamez.update(FlowRouter.getParam('id'), {
    			  $set: ob,
    			});
    			targ.text('O');
    		}
    	}
  },
});


