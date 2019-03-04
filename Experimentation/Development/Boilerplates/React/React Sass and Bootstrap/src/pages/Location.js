
import React from 'react';
import Navigation from '../components/Navigation';
import MapContainer from '../components/GoogleMapsIframe';
import Header from '../components/Header';
import ApiCall from '../components/ApiCall';
import '../styles/Location.scss';

class Location extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataUser: {},
			isLoading: true,
			urlParam: {
				userIdA: this.props.match.params.id1,
				userIdB: this.props.match.params.id2
			}
		};
	}

	setBriefHeight() {

		/* Adjust height */ 

		const headerHeight = document.body.getElementsByClassName('header')[0].offsetHeight,
			  navigatorComponentHeight = document.body.getElementsByClassName('navigation')[0].offsetHeight,
			  doctorStatus = document.body.getElementsByClassName('doctorStatus')[0].offsetHeight,
			  windowHeight = window.innerHeight,
			  extraMargin = 40,
			  googleMapWith = document.body.getElementsByClassName('googleMap')[0].offsetWidth,
			  calculateMapHeight = windowHeight - extraMargin - headerHeight - doctorStatus - navigatorComponentHeight;

		document.body.getElementsByClassName('mapContainer')[0].style.height = calculateMapHeight.toString() + "px";
		document.body.getElementsByClassName('iframe-styles')[0].style.height = calculateMapHeight.toString() + "px";
		document.body.getElementsByClassName('iframe-styles')[0].style.width = googleMapWith.toString() + "px";
	}


	componentDidMount() {

		const self = this;

		function getData() {
			self.callApi()
				.then(res => {
					self.setState({ 
						dataUser: res,
						isLoading: false 
					})
					self.setBriefHeight();
				})
				.catch(err => console.log(err))
		} 

		/* call Service in Intervals */
		
		this.interval = setInterval(getData(), 10000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	callApi = async () => {
		const response = await fetch('https://mr-dot-uma-v2.appspot.com/' + this.state.urlParam.userIdA + '/' + this.state.urlParam.userIdB + '/history'),
			  body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	render() {

		const isDelayed = true,
			  delayedMinutes = 5;

		if (!this.state.isLoading) {
			return (
				<div>
					<Header headerData={!this.state.isLoading && this.state.dataUser}/>
					<div className="container-fluid location">
						<div className="mapContainer">
							<div className="googleMap">
								<MapContainer mapContainerData={!this.state.isLoading && this.state.dataUser}/>
							</div>
						</div>
						<div className="doctorStatus d-flex">
							<div className="leftColumn">
								<div className="arrivalTimeText">Tiempo estimado de llegada</div>
								<div className={isDelayed === (true) ? 'delayedTime orangeDelayed' : 'delayedTime blueDelayed'}>{isDelayed === (true) ? delayedMinutes + ' minuto de retraso' : 'a horario'}</div>
							</div>
							<div className="rightColumn">
								<div className={isDelayed === (true) ? 'exactTime orangeDelayedBackground' : 'exactTime blueDelayedBackground'}>5 minutos</div>
							</div> 
						</div>
					</div>
					<Navigation selectedNavigation={'location'} userUrlParam={this.state.urlParam}/>
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

export default Location;
