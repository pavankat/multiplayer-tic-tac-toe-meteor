import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import '../ui/game.html';
import '../ui/body.html';

//in the intermediate example: 
	//BlazeLayout.render('MainLayout', {main: 'Recipes'});

FlowRouter.route('/', {
	name: 'home',
	action() {
		console.log('home')
		BlazeLayout.render('imports/ui/body');
	}
});

FlowRouter.route('/game/:id', {
	name: 'game',
	action() {
		console.log('game')
		BlazeLayout.render('imports/ui/game');
	}
});

