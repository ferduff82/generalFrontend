
import React from 'react';

class Form extends React.Component {

	changeEvent(betNumber) {
		this.props.changeValue(betNumber);
	}

	submitEvent(betNumber) {
		this.props.submitValue(betNumber);
	}

	render() {
		return (
	    	<div className="container-fluid">
		  		<form onSubmit={this.submitEvent.bind(this)}>
			  		<div className="input-group input-group-sm mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
						</div>
						<input type="text" className="form-control"  value={this.props.defaultValue.value} onChange={this.changeEvent.bind(this)} aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
					</div>
					<label htmlFor="exampleFormControlSelect1">Example select</label>
					<select className="form-control input-group input-group-sm mb-3" id="exampleFormControlSelect1" onChange={this.changeEvent.bind(this)}>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
				   </select>
					<div className="input-group input-group-sm mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
						</div>
						<input type="text" className="form-control" value={this.props.defaultValue.value} onChange={this.changeEvent.bind(this)} aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
					</div>
		    		<input type="submit" value="Submit" className="btn btn-primary"/>
		  		</form>
				<i className="material-icons">book</i>
	  		</div>
		)
	}
}

export default Form;
