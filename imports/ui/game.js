import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './game.html';

Template.Game.onCreated(function(){
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		debugger;
	});
});

Template.Game.helpers({
	game() {
		var id = FlowRouter.getParam('id');
		debugger;
		console.log(id);
		console.log(Games.findOne({_id: id}));
		return Games.findOne({_id: id});
	}
});


