import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

export const Games = new Mongo.Collection('games');
