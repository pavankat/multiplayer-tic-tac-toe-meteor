import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import '../ui/game.html';
import '../ui/body.html';
import '../ui/layouts/MainLayout.html';

FlowRouter.route('/', {
	name: 'home',
	action() {
		console.log('home')
		BlazeLayout.render('MainLayout', {main: 'Main'});

	}
});

FlowRouter.route('/games/:id', {
	name: 'game',
	action() {
		console.log('game')
		BlazeLayout.render('MainLayout', {main: 'Game'});
	}
});

