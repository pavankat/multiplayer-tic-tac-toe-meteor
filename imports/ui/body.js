import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { Games } from '../api/tasks.js';

import './task.js';
import './game.html'; //need this here or the game.html template file won't be used in body.html
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  openGames() {
    return Games.find( { $or: [ { xs: null }, { os: null } ] } )
  },
  closedGames() {
    return Games.find({ $and: [ { xs: {$exists : true} }, { os: {$exists : true} } ] })
  },
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-game'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const player = target.player.value;
    let game;

    if (player == 1){
      game = {
        board: [],
        xs: Meteor.userId(),
        os: null,
        createdAt: new Date(), // current time
      }
    }else {
      // Insert a task into the collection
      game = {
        board: [],
        xs: null,
        os: Meteor.userId(),
        createdAt: new Date(), // current time
      }
    }

    Games.insert(game);
    
    // Clear form
    target.player.value = '';
  },
  // 'click .joinGame'(event) {
  //   console.log(event);
  // },
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
