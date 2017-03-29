import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

console.log('in api');
console.log(Games.find().fetch());
console.log('in api');
