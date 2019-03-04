
/* React Dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './registerServiceWorker';

/* Global Styles */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './index.scss';


/* Components */

import IndexApp from './App';


/* App Routing */
/* <Route path="/dashboard/(bread|cheese|applepie)/:id" component={Dashboard} /> */

const PrimaryLayout = () => (
	<div className="primary-layout">
		<main>
			<Route path="/" exact component={IndexApp} />
		</main>
	</div>
)

const Main = () => (
	<BrowserRouter>
		<PrimaryLayout />
	</BrowserRouter>
)

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
