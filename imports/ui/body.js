import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './joinGame.html'; //need this here or the game.html template file won't be used in body.html
import './joinGame.js'
import './body.html';
import './game.js'; //if this isn't here then Games from the api/games.js file does not load properly

Template.Main.helpers({
  myGames() {
    return Games.find( { $or: [ { xs: Meteor.userId() }, { os: Meteor.userId() } ] } )
  },
  openGames() {
    return Games.find( { $or: [ { xs: null }, { os: null } ] } )
  },
  closedGames() {
    return Games.find({ $and: [ { xs: {$ne: null} }, { os: {$ne: null} } ] })
  }
});

Template.Main.events({
  'click td' : function(event){
    $(event.target).text('X');
    Games.update(this._id, {
      $set: { "board" : [['', '', ''],['', 'x', ''],['', '', '']]},
    });
  },
  'submit .new-game'(event) {
    debugger;
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const player = target.player.value;
    let game;
    let xs;
    let os;

    if (player == 1){
      xs = Meteor.userId();
      os = null;
    }else {
      xs = null;
      os = Meteor.userId();
    }

    game = {
      board: [],
      xs: xs,
      os: os,
      win: null,
      createdAt: new Date(), // current time
    }

    Games.insert(game);
    
    // Clear form
    target.player.value = '';
  },
  'click .joinGame'(event) {
    console.log(event);
    //event.target is the button we clicked on
    //this is the document here

    let button = event.target 
    let joinAs = $(button).data('joinas')

    if (joinAs == 'o'){
      if (this.xs != Meteor.userId()){
        Games.update(this._id, {
          $set: { "os" : Meteor.userId()},
        });
      }else {
        Bert.alert( 'ya can\'t join your own game brah!', 'danger', 'fixed-top', 'fa-frown-o' );
      }
    }else {
      if (this.os != Meteor.userId()){
        Games.update(this._id, {
          $set: { "xs" : Meteor.userId()},
        });
      }else {
        Bert.alert( 'ya can\'t join your own game brah!', 'danger', 'fixed-top', 'fa-frown-o' );
      }
    }
  }
});
