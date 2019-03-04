
import React from 'react';
import Navigation from '../components/Navigation';
import HistoricEachComponent from '../components/HistoricEachComponent';
import Header from '../components/Header';
import ApiCall from '../components/ApiCall';
import '../styles/Historic.scss';

class Historic extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataUser: {},
			dataHeader: {},
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
					dataUser: res.history.mrs,
					dataHeader:res,
					isLoading: false 
				})
			})
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('https://mr-dot-uma-v2.appspot.com/' + this.state.urlParam.userIdA + '/' + this.state.urlParam.userIdB + '/history'),
			  body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	render() {
		if (!this.state.isLoading) {
			return (
				<div className="historic-container">
					<Header headerData={!this.state.isLoading && this.state.dataHeader}/>
					<ul>
						{Object.keys(this.state.dataUser).map((p, index) => 
							<li key={index}>{ <HistoricEachComponent dataHistoricEach={this.state.dataUser[p]}/> }</li>
						)}
					</ul>
					<Navigation selectedNavigation={'historic'} userUrlParam={this.state.urlParam}/>
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

export default Historic;
