import React from 'react';

class Bets extends React.Component {
	render() {
		return (
			<div>
				<h3>Hiciste {this.props.apuestas} apuestas</h3>
				<h4>La apuesta cierra en {this.props.tiempoApuesta}</h4>
				<h1 className={(this.props.winnerNumber == null) ? 'hidden' : ''}>El número ganador es: {this.props.winnerNumber}</h1>
			</div>
		);
	}
}
export default Bets