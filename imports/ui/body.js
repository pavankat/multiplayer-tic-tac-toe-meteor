import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Games } from '../api/games.js';

import './joinGame.html'; //need this here or the game.html template file won't be used in body.html
import './joinGame.js'
import './body.html';
import './game.js'; //if this isn't here then Games from the api/games.js file does not load properly

Template.Main.helpers({
  myCurrentGames() {
    return Games.find( { $or: [ { xs: Meteor.userId() }, { os: Meteor.userId() } ], win : false } )
  },
  myPastGames() {
    return Games.find( { $or: [ { xs: Meteor.userId() }, { os: Meteor.userId() } ], win : true } )
  },
  openGames() { //find games where x or o is not in play AND both x, o are not current user id
    return Games.find( { $or: [ { xs: null }, { os: null } ] , $and: [ { xs: {$ne: Meteor.userId()} }, { os: {$ne: Meteor.userId()} } ] } )
  },
  closedGames() { //find games where xs and os does not equal the current user id AND are not null AND win is false
    return Games.find({ $and: [ { xs: {$ne: null} }, { os: {$ne: null} } ], win: false, $and: [ { xs: {$ne: Meteor.userId()} }, { os: {$ne: Meteor.userId()} } ]})
  },
  finishedGames() { //find games where xs and os does not equal the current user id AND are not null AND win is true
    return Games.find({ $and: [ { xs: {$ne: null} }, { os: {$ne: null} } ], win: true, $and: [ { xs: {$ne: Meteor.userId()} }, { os: {$ne: Meteor.userId()} } ] })
  }
});

Template.Main.events({
  'submit .new-game'(event) {
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
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      i: '',
      xs: xs,
      os: os,
      win: false,
      winner: null,
      x_start: false,
      o_start: false,
      start_time: new Date(), // current time
      createdAt: new Date(), // current time
    }

    Games.insert(game);
    
    // Clear form
    target.player.value = '';
  },
  'click .joinGame'(event) {

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
