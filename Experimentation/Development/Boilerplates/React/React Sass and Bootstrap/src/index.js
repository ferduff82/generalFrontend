
/* React Dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

/* Global Styles */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/Index.scss';

/* Components */

import UserInfo from './pages/UserInfo';
import Historic from './pages/Historic';
import Location from './pages/Location';

/* App Routing */
/* <Route path="/dashboard/(bread|cheese|applepie)/:id" component={Dashboard} /> */

const PrimaryLayout = () => (
	<div className="primary-layout">
		<main>
			<Route path="/:id1/:id2/index" exact component={UserInfo} />
			<Route path="/:id1/:id2/historic" component={Historic} />
			<Route path="/:id1/:id2/location" component={Location} />
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
