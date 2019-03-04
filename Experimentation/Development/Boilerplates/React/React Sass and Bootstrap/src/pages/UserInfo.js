
import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import EmergencyComponent from '../components/EmergencyComponent';
import BriefComponent from '../components/BriefComponent';
import Header from '../components/Header';
import ApiCall from '../components/ApiCall';
import '../styles/UserInfo.scss';

class UserInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataUser: null,
			isLoading: true,
			urlParam: {
				userIdA: this.props.match.params.id1,
				userIdB: this.props.match.params.id2
			}
		};
	}

	componentDidMount() {

		/* Create callApi  */ 

		this.callApi()
			.then(res => {
				this.setState({ 
					dataUser: res,
					isLoading: false 
				})
			})
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('https://mr-dot-uma-v2.appspot.com/' + this.state.urlParam.userIdA + '/' + this.state.urlParam.userIdB + '/history' ),
			  body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	render() {
		if (!this.state.isLoading) {
			return (
				<div className="background-color-grey">
					<Header headerData={!this.state.isLoading && this.state.dataUser}/>
					<EmergencyComponent emergencyData={!this.state.isLoading && this.state.dataUser}/>
					<BriefComponent briefData={!this.state.isLoading && this.state.dataUser}/>
					<Navigation selectedNavigation={'userInfo'} userUrlParam={this.state.urlParam}/>
				</div>
			)
		} else {
			return (
				<div className="loading spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			)
		}
	}
}

export default UserInfo;
