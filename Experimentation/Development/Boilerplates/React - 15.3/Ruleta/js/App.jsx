import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Winner from './content/winner';
import Bets from './content/bets';
import Header from './content/header';
import SignIn from './content/signin';
import Cell from './content/cell';

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
		console.log(betValue);
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
				<Cell setBet={this.addBet.bind(this)}></Cell>
				<Bets apuestas={this.state.betNumber} tiempoApuesta={this.state.betTime} winnerNumber={this.state.winnerNumber}></Bets>
				<Winner winnerIs={this.state.success} ></Winner>
			</div>
		);
	}
}

export default Ruleta;