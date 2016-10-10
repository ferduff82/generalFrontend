import React from 'react';

class SignIn extends React.Component {

	handleChange(e) {
		var title = e.target.value;
		this.props.loginChange(title);
	}

	handleClick() {
		var node = this.refs.input,
			text = node.value.trim();
		this.props.loginChange("Te has logeado con: " + text);
		node.value = '';
	}

	render() {
		return (
			<div>
				<input type="text" onChange={this.handleChange.bind(this)} ref="input"></input>
				<button onClick={(this.handleClick.bind(this))}>Sign In</button>
				<h5>{this.props.login}</h5>	
			</div>
		);
	}
}
export default SignIn