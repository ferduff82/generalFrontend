
import React from 'react';
import '../styles/Header.scss';
import Female from'../styles/img/female.png';
import Male from'../styles/img/male.png';

class Header extends React.Component {

	render() {
		console.log(this.props.headerData);
		if (this.props.headerData) {
			return (
				<div className="header">
					<div className="header-wrapper">
						<div className="p-2 text-center">
							<h5 className="position-absolute calc-center-align white-color">Dossier</h5>
						</div>
					</div>
					<div className="patient-data-wrapper pl-3 pr-3" >
						<div className="patient-data-info p-2">
							<div className="patient-nameandsex-container d-flex">
								<div className="patient-name">{this.props.headerData.user.fullname}</div>
								<div className={(this.props.headerData.user.sexo === 'F') ? 'female patient-sex position-absolute' : 'male patient-sex position-absolute'}><img src={(this.props.headerData.user.sexo === 'F') ? Female : Male} alt="sexo"></img></div>
							</div>
							<div className="patient-information">
								<div className="patient-name reduce-font-size">{this.props.headerData.user.address}</div>
								<div className="patient-age reduce-font-size position-absolute">{this.props.headerData.user.edad} años</div>
							</div>
							<div className="patient-information">
								<div className="patient-name reduce-font-size"><strong>DNI:</strong> {this.props.headerData.user.dni}</div>
								<div className="phone-container d-flex position-absolute">
									<div className="phone-icon">
										<i className="material-icons">phone</i>
									</div>
									<div className="phone-number reduce-font-size">{this.props.headerData.user.ws}</div>
								</div>
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

export default Header;
