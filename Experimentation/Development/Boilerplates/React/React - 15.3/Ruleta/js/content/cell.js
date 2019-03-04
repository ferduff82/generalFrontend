import React from 'react';

class Cell extends React.Component {

	handleBetClick(betNumber) {
		this.props.setBet(betNumber);
	}

	render() {
		return (
			<table>
				<tbody>
					<tr>
						<td onClick={(this.handleBetClick.bind(this))}>0</td>
						<td onClick={(this.handleBetClick.bind(this))}>1</td>
						<td onClick={(this.handleBetClick.bind(this))}>2</td>
						<td onClick={(this.handleBetClick.bind(this))}>3</td>
						<td onClick={(this.handleBetClick.bind(this))}>4</td>
						<td onClick={(this.handleBetClick.bind(this))}>5</td>
						<td onClick={(this.handleBetClick.bind(this))}>6</td>
						<td onClick={(this.handleBetClick.bind(this))}>7</td>
						<td onClick={(this.handleBetClick.bind(this))}>8</td>
						<td onClick={(this.handleBetClick.bind(this))}>9</td>
						<td onClick={(this.handleBetClick.bind(this))}>10</td>
						<td onClick={(this.handleBetClick.bind(this))}>11</td>
						<td onClick={(this.handleBetClick.bind(this))}>12</td>
						<td onClick={(this.handleBetClick.bind(this))}>13</td>
					</tr>
					<tr>
						<td onClick={(this.handleBetClick.bind(this))}>14</td>
						<td onClick={(this.handleBetClick.bind(this))}>15</td>
						<td onClick={(this.handleBetClick.bind(this))}>16</td>
						<td onClick={(this.handleBetClick.bind(this))}>17</td>
						<td onClick={(this.handleBetClick.bind(this))}>18</td>
						<td onClick={(this.handleBetClick.bind(this))}>19</td>
						<td onClick={(this.handleBetClick.bind(this))}>20</td>
						<td onClick={(this.handleBetClick.bind(this))}>21</td>
						<td onClick={(this.handleBetClick.bind(this))}>22</td>
						<td onClick={(this.handleBetClick.bind(this))}>23</td>
						<td onClick={(this.handleBetClick.bind(this))}>24</td>
						<td onClick={(this.handleBetClick.bind(this))}>25</td>
						<td onClick={(this.handleBetClick.bind(this))}>26</td>
						<td onClick={(this.handleBetClick.bind(this))}>27</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
export default Cell;