import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './game.html';

// Template.Game.onCreated(function(){
// 	var self = this;
// 	self.autorun(function() {
// 		var game_id = FlowRouter.getParam('id');
// 	});
// });

let xs;
let os;
let game_id;

Template.registerHelper('incremented', function (index) {
    index++;
    return index;
});

Template.Game.helpers({
	game() {
		let game = Games.findOne({_id: FlowRouter.getParam('id')});

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

   	//game_id, xs, os

    //works
    if (xs == Meteor.userId()){
    	$(event.target).text('X');

		// Games.update(this._id, {
		//   $set: { "os" : Meteor.userId()},
		// });
    }

    //works
    if (os == Meteor.userId()){
		$(event.target).text('O');

		// Games.update(this._id, {
		//   $set: { "xs" : Meteor.userId()},
		// });
    }

    // Games.update(this._id, {
    //   $set: { "board" : [['', '', ''],['', 'x', ''],['', '', '']]},
    // });
  },
});


