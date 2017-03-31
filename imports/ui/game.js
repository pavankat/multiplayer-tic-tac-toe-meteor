import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './game.html';

Template.Game.helpers({
	game() {
		return Games.findOne({_id: FlowRouter.getParam('id')});
	}
});

Template.Game.events({
  'click td' : function(event){
    $(event.target).text('X');
    // Games.update(this._id, {
    //   $set: { "board" : [['', '', ''],['', 'x', ''],['', '', '']]},
    // });
  },
});