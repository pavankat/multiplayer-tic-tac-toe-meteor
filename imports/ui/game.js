import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './game.html';

Template.Game.helpers({
	game() {
		return Games.findOne({_id: FlowRouter.getParam('id')});
	}
});
