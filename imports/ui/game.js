import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './game.html';

console.log(Games.find().fetch());

// Template.Game.onCreated(function(){
// 	var self = this;
// 	self.autorun(function() {
// 		var id = FlowRouter.getParam('id');
// 	});
// });

Template.Game.helpers({
	game() {
		var id = FlowRouter.getParam('id');
		console.log(id);
		console.log(Games.findOne({_id: id}));
		return Games.findOne({_id: id});
	}
});


