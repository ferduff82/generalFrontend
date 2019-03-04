
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Navigation from './Navigation';

class MedicalRecord extends React.Component {

	render() {
		return (
	    	<div>
	    		<div className="container-fluid">
		    		<Link to={this.props.match.url}>See availability</Link>
		    		<h1>Medical Record</h1>
		    		<h2>{this.props.match.params.id}</h2>
	    		</div>
	    		<Navigation selectedNavigation={'medicalRecord'}/>
	  		</div>
		)
	}
}

export default MedicalRecord;
