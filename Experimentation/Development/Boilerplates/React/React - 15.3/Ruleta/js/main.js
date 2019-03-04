import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Ruleta from './App.jsx';
import Start from './pages/start';
import Terms from './pages/terms';
import Help from './pages/help';

var app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Ruleta}> 
			<IndexRoute component={Start}></IndexRoute>
			<Route path="home" component={Start}></Route>
			<Route path="termsandconditions/:article" component={Terms}></Route>
			<Route path="termsandconditions" component={Terms}></Route>
			<Route path="help" component={Help}></Route>
		</Route>
	</Router>,
app);