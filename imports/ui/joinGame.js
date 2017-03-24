import { Template } from 'meteor/templating';

import { Games } from '../api/tasks.js';

import './joinGame.html';

Template.joinGame.helpers({
    belongs: function() {
    	console.log(this.xs);
    	console.log(Meteor.userId());
    	console.log(this.os);
    	return ((this.xs == Meteor.userId()) || (this.os == Meteor.userId()));
    }
});