import React from 'react';

export default class Terms extends React.Component {
	render() {
		return (
			<div>
				<h4>Terms and Conditions ({this.props.params.article})</h4>
				<h5>{this.props.location.query.tfefe}</h5>	
			</div>
		);
	}
}