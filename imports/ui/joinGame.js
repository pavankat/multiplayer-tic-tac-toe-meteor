import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './joinGame.html';

Template.joinGame.helpers({
	grabUserName : function(_id){
		//this returns a cursor and that's why we have to do .fetch on it
		return Meteor.users.find(_id).fetch()[0].username;
	},
    belongs : function() {
    	console.log((this.xs == Meteor.userId()) || (this.os == Meteor.userId()));
    	return ((this.xs == Meteor.userId()) || (this.os == Meteor.userId()));
    }
});