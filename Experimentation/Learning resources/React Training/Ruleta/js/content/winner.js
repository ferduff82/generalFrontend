import React from 'react';

class Winner extends React.Component {
	render() {
		var allWiners = this.props.winnerIs;
		if (allWiners != null)  {
			var mapWinners = allWiners.map(function(winner) {
				return winner;
			});
			var getWinners = mapWinners.join(", ");
		}
		
		return (
			<div>
				<span className={(this.props.winnerIs == null) ? 'hidden' : ''}>
					<h1>Ganaste con los números: {getWinners}</h1>
				</span>
			</div>
		)
	}
}
export default Winner;