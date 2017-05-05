import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Winner from './content/winner';
import Bets from './content/bets';
import Header from './content/header';
import SignIn from './content/signin';

class Ruleta extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			betNumber: 0,
			betTime: 0,
			winnerNumber: null,
			success: null,
			bets: [],
			userValue: "Please Log In"
		}

		this.addBet = this.addBet.bind(this)
   	}

	addBet(e) {
		var betValue = e.target.innerText;
		this.setState({ betNumber: this.state.betNumber + 1 })
		this.setState({ betNumber: this.state.bets.push(betValue) })
	}

	changeLoginUser(title) {
		this.setState({ userValue: title });
	}

	componentDidMount() {
		var that = this;
	    setInterval(
			function() { 
				that.setState({ betNumber: 0 });
				that.setState({ winnerNumber: Math.floor((Math.random() * 28)) });
				var getWinnerValues = that.state.bets.filter(function(item){
						return item == that.state.winnerNumber;
				})				
				if (getWinnerValues.length > 0) {
					that.setState({ success: getWinnerValues });
				};
				that.setState({ bets: [] })
			}
		, 30000);
	    setInterval(
			function() { 
				if ( that.state.betTime < 29 ) { 
					that.setState({ betTime: that.state.betTime + 1 })
				} else {
					that.setState({ betTime: 0 })
				}
			}
		, 1000);
	}

	render() {
		return (
			<div>
				<SignIn loginChange={this.changeLoginUser.bind(this)} login={this.state.userValue}></SignIn>
				<Link to="home" activeClassName="activeLink">Home</Link>
				<Link to="termsandconditions" activeClassName="activeLink">Terms and Conditions</Link>
				<Link to="help" activeClassName="activeLink">Help</Link>
				{this.props.children}
				<Header/>
				<table>
					<tbody>
						<tr>
							<td onClick={this.addBet}>0</td>
							<td onClick={this.addBet}>1</td>
							<td onClick={this.addBet}>2</td>
							<td onClick={this.addBet}>3</td>
							<td onClick={this.addBet}>4</td>
							<td onClick={this.addBet}>5</td>
							<td onClick={this.addBet}>6</td>
							<td onClick={this.addBet}>7</td>
							<td onClick={this.addBet}>8</td>
							<td onClick={this.addBet}>9</td>
							<td onClick={this.addBet}>10</td>
							<td onClick={this.addBet}>11</td>
							<td onClick={this.addBet}>12</td>
							<td onClick={this.addBet}>13</td>
						</tr>
						<tr>
							<td onClick={this.addBet}>14</td>
							<td onClick={this.addBet}>15</td>
							<td onClick={this.addBet}>16</td>
							<td onClick={this.addBet}>17</td>
							<td onClick={this.addBet}>18</td>
							<td onClick={this.addBet}>19</td>
							<td onClick={this.addBet}>20</td>
							<td onClick={this.addBet}>21</td>
							<td onClick={this.addBet}>22</td>
							<td onClick={this.addBet}>23</td>
							<td onClick={this.addBet}>24</td>
							<td onClick={this.addBet}>25</td>
							<td onClick={this.addBet}>26</td>
							<td onClick={this.addBet}>27</td>
						</tr>
					</tbody>
				</table>
				<Bets apuestas={this.state.betNumber} tiempoApuesta={this.state.betTime} winnerNumber={this.state.winnerNumber}></Bets>
				<Winner winnerIs={this.state.success} ></Winner>
			</div>
		);
	}
}

export default Ruleta;