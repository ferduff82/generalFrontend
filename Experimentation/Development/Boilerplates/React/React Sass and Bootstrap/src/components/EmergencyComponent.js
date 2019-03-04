
import React from 'react';
import '../styles/EmergencyComponent.scss';
import Ambulance from '../styles/img/ambulance.png';

class EmergencyComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			toggleHistory:'hidden',
			dateParsed: ''
		};
	}

	toggleHistoricData() {
		const css = (this.state.toggleHistory === "hidden") ? "show" : "hidden";
    	this.setState({"toggleHistory":css});
	}

	parseDate(date) {
		const res = date.split(":"),
			  fullDate = res[0] + ':' + res[1];
		return fullDate;
	}

	render() {

		if (this.props.emergencyData) {
			return (
				<div className="emergencyComponent d-flex container-fluid">
					<div className={this.props.emergencyData.mr.pre_clasif + ' right-side p-2 position-relative'}>
						<div className="first-row d-flex">
							<div className="title-emergency">
								<div className="emergency-name">
									{this.parseDate(this.props.emergencyData.mr.dt)} 
								</div>
							</div>
							<div className="right-icons d-flex position-absolute">
								<div className="icon-ambulance">
									{this.props.emergencyData.mr.pre_clasif === 'VERDE' ? <i className="fas fa-user-md"></i> : <img src={Ambulance} alt="ambulancia"></img>}			
								</div>	
							</div>
						</div>
						<div className={(this.state.toggleHistory === "hidden") ? "second-row heightFixed" : "second-row heightAuto"}>
							<div className="description-emergency">
								<p className={(this.state.toggleHistory === "hidden") ? "emergency-name ellipsis" : "emergency-name"}>
									{this.props.emergencyData.mr.arbol ? this.props.emergencyData.mr.arbol : 'No hay datos disponibles.'}
								</p>
								{this.props.emergencyData.mr.antecedentes.map((p, index) => 
									<p key={index}><strong>Antecedentes: </strong>{(this.props.emergencyData.mr.antecedentes[index]) ? this.props.emergencyData.mr.antecedentes[index] : ' -'} </p>
								)}
							</div>
							<div className="full-description" onClick={() => this.toggleHistoricData()}>
								<i className={(this.state.toggleHistory === "hidden") ? "show material-icons" : "hidden material-icons"}>add_circle</i>
								<i className={(this.state.toggleHistory === "hidden") ? "hidden material-icons" : "show material-icons"}>remove_circle</i>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}

export default EmergencyComponent;
